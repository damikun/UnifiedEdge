﻿using ElectronNET.API.Entities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System;
using System.Threading.Tasks;

namespace ElectronNET.API
{
    /// <summary>
    /// Render and control web pages.
    /// </summary>
    public class WebContents
    {
        /// <summary>
        /// Gets the identifier.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        public int Id { get; private set; }

        /// <summary>
        /// Manage browser sessions, cookies, cache, proxy settings, etc.
        /// </summary>
        public Session Session { get; internal set; }

        /// <summary>
        /// Emitted when the renderer process crashes or is killed.
        /// </summary>
        public event Action<bool> OnCrashed
        {
            add
            {
                if (_crashed == null)
                {
                    BridgeConnector.On<bool>("webContents-crashed" + Id, (killed) =>
                    {
                        _crashed(killed);
                    });

                    BridgeConnector.Emit("register-webContents-crashed", Id);
                }
                _crashed += value;
            }
            remove
            {
                _crashed -= value;

                if (_crashed == null)
                    BridgeConnector.Off("webContents-crashed" + Id);
            }
        }

        private event Action<bool> _crashed;

        /// <summary>
        /// Emitted when the navigation is done, i.e. the spinner of the tab has
        /// stopped spinning, and the onload event was dispatched.
        /// </summary>
        public event Action OnDidFinishLoad
        {
            add
            {
                if (_didFinishLoad == null)
                {
                    BridgeConnector.On("webContents-didFinishLoad" + Id, () =>
                    {
                        _didFinishLoad();
                    });

                    BridgeConnector.Emit("register-webContents-didFinishLoad", Id);
                }
                _didFinishLoad += value;
            }
            remove
            {
                _didFinishLoad -= value;

                if (_didFinishLoad == null)
                    BridgeConnector.Off("webContents-didFinishLoad" + Id);
            }
        }

        private event Action _didFinishLoad;

        internal WebContents(int id)
        {
            Id = id;
            Session = new Session(id);
        }

        /// <summary>
        /// Opens the devtools.
        /// </summary>
        public void OpenDevTools()
        {
            BridgeConnector.Emit("webContentsOpenDevTools", Id);
        }

        /// <summary>
        /// Opens the devtools.
        /// </summary>
        /// <param name="openDevToolsOptions"></param>
        public void OpenDevTools(OpenDevToolsOptions openDevToolsOptions)
        {
            BridgeConnector.Emit("webContentsOpenDevTools", Id, openDevToolsOptions);
        }

        /// <summary>
        /// Get system printers.
        /// </summary>
        /// <returns>printers</returns>
        public Task<PrinterInfo[]> GetPrintersAsync()
        {
            return BridgeConnector.OnResult<PrinterInfo[]>("webContents-getPrinters", "webContents-getPrinters-completed" + Id, Id);
        }

        /// <summary>
        /// Prints window's web page.
        /// </summary>
        /// <param name="options"></param>
        /// <returns>success</returns>
        public Task<bool> PrintAsync(PrintOptions options = null) => options is null ? BridgeConnector.OnResult<bool>("webContents-print", "webContents-print-completed" + Id, Id, "")
                                                                                     : BridgeConnector.OnResult<bool>("webContents-print", "webContents-print-completed" + Id, Id, options);

        /// <summary>
        /// Prints window's web page as PDF with Chromium's preview printing custom
        /// settings.The landscape will be ignored if @page CSS at-rule is used in the web page. 
        /// By default, an empty options will be regarded as: Use page-break-before: always; 
        /// CSS style to force to print to a new page.
        /// </summary>
        /// <param name="path"></param>
        /// <param name="options"></param>
        /// <returns>success</returns>
        public Task<bool> PrintToPDFAsync(string path, PrintToPDFOptions options = null) => options is null ? BridgeConnector.OnResult<bool>("webContents-printToPDF", "webContents-printToPDF-completed" + Id, Id, "", path)
                                                                                                            : BridgeConnector.OnResult<bool>("webContents-printToPDF", "webContents-printToPDF-completed" + Id, Id, options, path);

        /// <summary>
        /// Is used to get the Url of the loaded page.
        /// It's usefull if a web-server redirects you and you need to know where it redirects. For instance, It's useful in case of Implicit Authorization.
        /// </summary>
        /// <returns>URL of the loaded page</returns>
        public Task<string> GetUrl()
        {
            return BridgeConnector.OnResult<string>("webContents-getUrl", "webContents-getUrl" + Id, Id);
        }

        /// <summary>
        /// The async method will resolve when the page has finished loading, 
        /// and rejects if the page fails to load.
        /// 
        /// A noop rejection handler is already attached, which avoids unhandled rejection
        /// errors.
        ///
        /// Loads the `url` in the window. The `url` must contain the protocol prefix, e.g.
        /// the `http://` or `file://`. If the load should bypass http cache then use the
        /// `pragma` header to achieve it.
        /// </summary>
        /// <param name="url"></param>
        public Task LoadURLAsync(string url)
        {
            return LoadURLAsync(url, new LoadURLOptions());
        }

        /// <summary>
        /// The async method will resolve when the page has finished loading, 
        /// and rejects if the page fails to load.
        /// 
        /// A noop rejection handler is already attached, which avoids unhandled rejection
        /// errors.
        ///
        /// Loads the `url` in the window. The `url` must contain the protocol prefix, e.g.
        /// the `http://` or `file://`. If the load should bypass http cache then use the
        /// `pragma` header to achieve it.
        /// </summary>
        /// <param name="url"></param>
        /// <param name="options"></param>
        public Task LoadURLAsync(string url, LoadURLOptions options)
        {  
            var taskCompletionSource = new TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously);

            BridgeConnector.On("webContents-loadURL-complete" + Id, () =>
            {
                BridgeConnector.Off("webContents-loadURL-complete" + Id);
                BridgeConnector.Off("webContents-loadURL-error" + Id);
                taskCompletionSource.SetResult();
            });

            BridgeConnector.On<string>("webContents-loadURL-error" + Id, (error) =>
            {
                BridgeConnector.Off("webContents-loadURL-error" + Id);
                BridgeConnector.Off("webContents-loadURL-complete" + Id);
                taskCompletionSource.SetException(new InvalidOperationException(error.ToString()));
            });

            BridgeConnector.Emit("webContents-loadURL", Id, url, options);

            return taskCompletionSource.Task;
        }

        /// <summary>
        /// Inserts CSS into the web page.
        /// See: https://www.electronjs.org/docs/api/web-contents#contentsinsertcsscss-options
        /// Works for both BrowserWindows and BrowserViews.
        /// </summary>
        /// <param name="isBrowserWindow">Whether the webContents belong to a BrowserWindow or not (the other option is a BrowserView)</param>
        /// <param name="path">Absolute path to the CSS file location</param>
        public void InsertCSS(bool isBrowserWindow, string path)
        {
            BridgeConnector.Emit("webContents-insertCSS", Id, isBrowserWindow, path);
        }
    }
}