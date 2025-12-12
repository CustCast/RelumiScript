using Avalonia.Data.Converters;
using System;
using System.Globalization;

namespace RelumiScript
{
    public class SearchTypeToIconConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value is string type)
            {
                // Return icons based on the search result type
                return type switch
                {
                    "FLG" => "🚩", // Flag
                    "WRK" => "🔨", // Work
                    "SYS" => "⚙️", // System Flag
                    "CMD" => "💻", // Command
                    "VAR" => "📦", // Variable
                    "SCR" => "📜", // Script
                    _ => "🔍"      // Default Search Icon
                };
            }
            return "❓";
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}