using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace RelumiScript.Services
{
    public class TerminalSession : IDisposable
    {
        private Process? _process;
        private bool _isDisposed;
        public event Action<string>? OutputReceived;

        public bool IsRunning => _process != null && !_process.HasExited;

        public void Start(string workingDirectory)
        {
            if (IsRunning) return;

            var startInfo = new ProcessStartInfo
            {
                // Switch to PowerShell
                FileName = "powershell.exe",
                // -NoLogo: Hides the copyright banner
                // -NoExit: Ensures the process doesn't quit after running a command (vital for interactive mode)
                // -ExecutionPolicy Bypass: Ensures you can run scripts if needed without permission errors
                Arguments = "-NoLogo -NoExit -ExecutionPolicy Bypass",

                UseShellExecute = false,
                RedirectStandardInput = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                CreateNoWindow = true,
                // PowerShell output often works best with the default system encoding in this context,
                // but if you see weird characters, try Encoding.UTF8.
                StandardOutputEncoding = Encoding.Default,
                StandardErrorEncoding = Encoding.Default
            };

            if (!string.IsNullOrEmpty(workingDirectory) && Directory.Exists(workingDirectory))
                startInfo.WorkingDirectory = workingDirectory;
            else
                startInfo.WorkingDirectory = AppDomain.CurrentDomain.BaseDirectory;

            try
            {
                _process = new Process { StartInfo = startInfo };
                _process.Start();

                // Start background threads to read output continuously
                Task.Run(() => ReadStream(_process.StandardOutput));
                Task.Run(() => ReadStream(_process.StandardError));
            }
            catch (Exception ex)
            {
                OutputReceived?.Invoke($"Error starting PowerShell: {ex.Message}\n");
            }
        }

        private async Task ReadStream(StreamReader reader)
        {
            var buffer = new char[1024];
            while (!_isDisposed && _process != null && !_process.HasExited)
            {
                try
                {
                    // Read asynchronously to keep UI responsive
                    int readCount = await reader.ReadAsync(buffer, 0, buffer.Length);
                    if (readCount > 0)
                    {
                        string text = new string(buffer, 0, readCount);
                        OutputReceived?.Invoke(text);
                    }
                    else
                    {
                        await Task.Delay(50);
                    }
                }
                catch
                {
                    break;
                }
            }
        }

        public void SendCommand(string command)
        {
            if (IsRunning && _process != null)
            {
                try
                {
                    _process.StandardInput.WriteLine(command);
                }
                catch (Exception ex)
                {
                    OutputReceived?.Invoke($"\nError sending command: {ex.Message}\n");
                }
            }
        }

        public void Dispose()
        {
            _isDisposed = true;
            if (_process != null)
            {
                try
                {
                    if (!_process.HasExited) _process.Kill();
                }
                catch { }
                _process.Dispose();
                _process = null;
            }
        }
    }
}