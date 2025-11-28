import React, { useState, useEffect } from 'react';
import { Clock, Settings, Smartphone, Type, Palette, Layout } from 'lucide-react';

export default function ClockWidgetApp() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedFont, setSelectedFont] = useState('Inter');
    const [fontSize, setFontSize] = useState('medium');
    const [timeFormat, setTimeFormat] = useState('12h');
    const [dateFormat, setDateFormat] = useState('full');
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const fonts = [
        'Inter',
        'Roboto',
        'Montserrat',
        'Playfair Display',
        'Courier New',
        'Georgia',
        'Arial',
        'Verdana'
    ];

    const fontSizes = {
        small: { time: 'text-4xl', date: 'text-sm' },
        medium: { time: 'text-6xl', date: 'text-base' },
        large: { time: 'text-8xl', date: 'text-lg' }
    };

    const formatTime = (date) => {
        if (timeFormat === '12h') {
            return date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        }
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const formatDate = (date) => {
        const options = {
            short: { month: 'short', day: 'numeric' },
            full: { weekday: 'long', month: 'long', day: 'numeric' },
            numeric: { month: 'numeric', day: 'numeric', year: 'numeric' }
        };
        return date.toLocaleDateString('en-US', options[dateFormat]);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            {/* Header */}
            <div className="bg-black/30 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-linear-to-br from-purple-500 to-pink-500 p-2 rounded-xl">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Custom Clock Widget</h1>
                            <p className="text-xs text-gray-400">Personalize your home screen</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <Settings className={`w-6 h-6 ${showSettings ? 'rotate-90' : ''} transition-transform`} />
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Widget Preview */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Smartphone className="w-4 h-4" />
                            <span>Widget Preview</span>
                        </div>

                        <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                            <div
                                className="text-center space-y-2"
                                style={{ fontFamily: selectedFont }}
                            >
                                <div className={`${fontSizes[fontSize].time} font-bold tracking-tight`}>
                                    {formatTime(currentTime)}
                                </div>
                                <div className={`${fontSizes[fontSize].date} text-gray-300 tracking-wide`}>
                                    {formatDate(currentTime)}
                                </div>
                            </div>
                        </div>

                        {/* Quick Info */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                                <Type className="w-5 h-5 mx-auto mb-2 text-purple-400" />
                                <div className="text-xs text-gray-400">Font</div>
                                <div className="text-sm font-semibold">{selectedFont}</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                                <Layout className="w-5 h-5 mx-auto mb-2 text-pink-400" />
                                <div className="text-xs text-gray-400">Size</div>
                                <div className="text-sm font-semibold capitalize">{fontSize}</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                                <Clock className="w-5 h-5 mx-auto mb-2 text-blue-400" />
                                <div className="text-xs text-gray-400">Format</div>
                                <div className="text-sm font-semibold">{timeFormat}</div>
                            </div>
                        </div>
                    </div>

                    {/* Settings Panel */}
                    <div className={`space-y-6 ${showSettings ? 'block' : 'hidden lg:block'}`}>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Settings className="w-4 h-4" />
                            <span>Customization Options</span>
                        </div>

                        {/* Font Selection */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Type className="w-5 h-5 text-purple-400" />
                                Font Style
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {fonts.map(font => (
                                    <button
                                        key={font}
                                        onClick={() => setSelectedFont(font)}
                                        className={`p-3 rounded-xl border-2 transition-all ${selectedFont === font
                                                ? 'border-purple-500 bg-purple-500/20'
                                                : 'border-white/10 hover:border-white/30 bg-white/5'
                                            }`}
                                        style={{ fontFamily: font }}
                                    >
                                        {font}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Text Size */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Layout className="w-5 h-5 text-pink-400" />
                                Text Size
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                                {['small', 'medium', 'large'].map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setFontSize(size)}
                                        className={`p-3 rounded-xl border-2 transition-all capitalize ${fontSize === size
                                                ? 'border-pink-500 bg-pink-500/20'
                                                : 'border-white/10 hover:border-white/30 bg-white/5'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Time Format */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-400" />
                                Time Format
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setTimeFormat('12h')}
                                    className={`p-3 rounded-xl border-2 transition-all ${timeFormat === '12h'
                                            ? 'border-blue-500 bg-blue-500/20'
                                            : 'border-white/10 hover:border-white/30 bg-white/5'
                                        }`}
                                >
                                    12 Hour
                                </button>
                                <button
                                    onClick={() => setTimeFormat('24h')}
                                    className={`p-3 rounded-xl border-2 transition-all ${timeFormat === '24h'
                                            ? 'border-blue-500 bg-blue-500/20'
                                            : 'border-white/10 hover:border-white/30 bg-white/5'
                                        }`}
                                >
                                    24 Hour
                                </button>
                            </div>
                        </div>

                        {/* Date Format */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Palette className="w-5 h-5 text-green-400" />
                                Date Format
                            </h3>
                            <div className="space-y-2">
                                {[
                                    { value: 'short', label: 'Short (Dec 25)' },
                                    { value: 'full', label: 'Full (Monday, December 25)' },
                                    { value: 'numeric', label: 'Numeric (12/25/2024)' }
                                ].map(format => (
                                    <button
                                        key={format.value}
                                        onClick={() => setDateFormat(format.value)}
                                        className={`w-full p-3 rounded-xl border-2 transition-all text-left ${dateFormat === format.value
                                                ? 'border-green-500 bg-green-500/20'
                                                : 'border-white/10 hover:border-white/30 bg-white/5'
                                            }`}
                                    >
                                        {format.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-linear-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                            <h3 className="text-lg font-semibold mb-3">How to Add Widget</h3>
                            <ol className="space-y-2 text-sm text-gray-300">
                                <li className="flex gap-2">
                                    <span className="text-purple-400 font-bold">1.</span>
                                    <span>Long-press on your home screen</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-purple-400 font-bold">2.</span>
                                    <span>Tap "Widgets" from the menu</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-purple-400 font-bold">3.</span>
                                    <span>Find "Custom Clock Widget"</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-purple-400 font-bold">4.</span>
                                    <span>Drag it to your home screen</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="max-w-6xl mx-auto px-4 py-8 mt-8 border-t border-white/10">
                <div className="text-center space-y-2">
                    <p className="text-sm text-gray-400">
                        Lightweight • Battery-friendly • No ads
                    </p>
                    <p className="text-xs text-gray-500">
                        Works on Android 8.0 and above
                    </p>
                    <p className="text-xs text-gray-500">
                        &copy; 2025, Abhisek, All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}