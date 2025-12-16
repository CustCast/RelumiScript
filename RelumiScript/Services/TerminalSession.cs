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
                FileName = "powershell.exe",
                // -NoExit: Keep session alive
                // -ExecutionPolicy Bypass: Allow scripts
                Arguments = "-NoLogo -NoExit -ExecutionPolicy Bypass",

                UseShellExecute = false,
                RedirectStandardInput = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                CreateNoWindow = true,
                StandardOutputEncoding = Encoding.UTF8,
                StandardErrorEncoding = Encoding.UTF8,

                // CRITICAL FIX: Use UTF8Encoding(false) to prevent emitting a Byte Order Mark (BOM).
                // A BOM at the start of the stream is read by PowerShell as part of the first command,
                // causing "Command not recognized" errors for otherwise valid commands.
                StandardInputEncoding = new UTF8Encoding(false)
            };

            // Fix for Git paging issues
            startInfo.EnvironmentVariables["GIT_PAGER"] = "cat";
            startInfo.EnvironmentVariables["PAGER"] = "cat";
            startInfo.EnvironmentVariables["TERM"] = "xterm-256color";

            if (!string.IsNullOrEmpty(workingDirectory) && Directory.Exists(workingDirectory))
                startInfo.WorkingDirectory = workingDirectory;
            else
                startInfo.WorkingDirectory = AppDomain.CurrentDomain.BaseDirectory;

            try
            {
                _process = new Process { StartInfo = startInfo };
                _process.Start();

                // CRITICAL: AutoFlush ensures commands are sent immediately
                _process.StandardInput.AutoFlush = true;

                // FIX: Initialization command sequence.
                // 1. chcp 65001: Sets the native console code page to UTF-8. piped to $null to hide output.
                // 2. Set .NET Console encoding to match.
                // 3. Clear-Host to provide a clean prompt.
                _process.StandardInput.WriteLine("chcp 65001 > $null; [System.Console]::OutputEncoding = [System.Text.Encoding]::UTF8; Clear-Host");

                // Start background threads to read output continuously
                Task.Run(() => ReadStream(_process.StandardOutput));
                Task.Run(() => ReadStream(_process.StandardError));
            }
            catch (Exception ex)
            {
                OutputReceived?.Invoke($"\x1b[31mError starting PowerShell: {ex.Message}\x1b[0m\r\n");
            }
        }

        private async Task ReadStream(StreamReader reader)
        {
            var buffer = new char[1024];
            while (!_isDisposed && _process != null && !_process.HasExited)
            {
                try
                {
                    int readCount = await reader.ReadAsync(buffer, 0, buffer.Length);
                    if (readCount > 0)
                    {
                        string text = new string(buffer, 0, readCount);
                        OutputReceived?.Invoke(text);
                    }
                    else
                    {
                        await Task.Delay(10);
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
                    // Write command to stdin
                    _process.StandardInput.WriteLine(command);
                }
                catch (Exception ex)
                {
                    OutputReceived?.Invoke($"\r\n\x1b[31mError sending command: {ex.Message}\x1b[0m\r\n");
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