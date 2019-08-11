import { app, BrowserWindow, remote, shell, screen } from "electron";
import { statSync } from "fs";
import * as path from "path";
const serve = require("electron-serve");

const loadURL = serve({ directory: "renderer" });
declare const __static: string;

interface LicenseEntry {
  type: string;
  url: string;
}

interface PackageJson {
  productName?: string;
  description?: string;
  homepage?: string;
  license?: string | LicenseEntry;
  bugs?: {
    url: string;
  };
}

interface HelpWindowInfo {
  icon_path: string;
  product_name?: string;
  copyright?: string;
  homepage?: string;
  description?: string;
  package_json_dir?: string;
  about_page_dir?: string;
  license?: string;
  bug_report_url?: string;
  css_path?: string | string[];
  adjust_window_size?: boolean;
  win_options?: Electron.BrowserWindowConstructorOptions;
  open_devtools?: boolean;
  use_inner_html?: boolean;
  bug_link_text?: string;
  use_version_info?: boolean;
  show_close_button?: string;
}

declare namespace NodeJS {
  interface ProcessVersions {
    [name: string]: string;
  }
}

let window: Electron.BrowserWindow = null;

function loadPackageJson(pkg_path: string): PackageJson {
  try {
    return require(pkg_path);
  } catch (e) {
    return null;
  }
}

function detectPackageJson(specified_dir: string) {
  if (specified_dir) {
    const pkg = loadPackageJson(path.join(specified_dir, "package.json"));
    if (pkg !== null) {
      return pkg;
    } else {
      console.warn(
        "about-window: package.json is not found in specified directory path: " +
          specified_dir
      );
    }
  }

  const app_name = app.getName();

  for (const mod_path of (module as any).paths) {
    if (!path.isAbsolute(mod_path)) {
      continue;
    }

    const p = path.join(mod_path, "..", "package.json");
    try {
      const stats = statSync(p);
      if (stats.isFile()) {
        const pkg = loadPackageJson(p);
        if (pkg !== null && pkg.productName === app_name) {
          return pkg;
        }
      }
    } catch (e) {
      // File not found.  Ignored.
    }
  }

  // Note: Not found.
  return null;
}

function injectInfoFromPackageJson(info: HelpWindowInfo) {
  const pkg = detectPackageJson(info.package_json_dir);
  if (pkg === null) {
    // Note: Give up.
    return info;
  }

  if (!info.product_name) {
    info.product_name = pkg.productName;
  }
  if (!info.description) {
    info.description = pkg.description;
  }
  if (!info.license && pkg.license) {
    const l = pkg.license;
    info.license = typeof l === "string" ? l : l.type;
  }
  if (!info.homepage) {
    info.homepage = pkg.homepage;
  }
  if (!info.bug_report_url && typeof pkg.bugs === "object") {
    info.bug_report_url = pkg.bugs.url;
  }
  if (info.use_inner_html === undefined) {
    info.use_inner_html = false;
  }
  if (info.use_version_info === undefined) {
    info.use_version_info = true;
  }

  return info;
}

function normalizeParam(
  info_or_img_path: HelpWindowInfo | string | undefined | null
): HelpWindowInfo {
  if (!info_or_img_path) {
    throw new Error(
      "First parameter of openAboutWindow() must not be empty. Please see the document: https://github.com/rhysd/electron-about-window/blob/master/README.md"
    );
  }

  if (typeof info_or_img_path === "string") {
    return { icon_path: info_or_img_path };
  } else {
    const info = info_or_img_path;
    if (!info.icon_path) {
      throw new Error(
        "First parameter of openAboutWindow() must have key 'icon_path'. Please see the document: https://github.com/rhysd/electron-about-window/blob/master/README.md"
      );
    }
    return info;
  }
}

export default function openHelpWindow(
  info_or_img_path: HelpWindowInfo | string
) {
  let info = normalizeParam(info_or_img_path);

  if (window !== null) {
    window.focus();
    return window;
  }

  let base_path = path.join(__static, "docs");
  // const loadURL = serve({ directory: "static/docs" });
  const index_html = "file://" + path.join(base_path, "index.html");
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;
  const options = Object.assign(
    {
      width: size.width / 2,
      height: size.height * 0.75,
      useContentSize: true,
      titleBarStyle: "hidden-inset",
      show: !info.adjust_window_size,
      icon: info.icon_path,
      webPreferences: {
        // For security reasons, nodeIntegration is no longer true by default when using Electron v5 or later
        // nodeIntegration can be safely enabled as long as the window source is not remote
        nodeIntegration: false,
        webSecurity: true
      }
    },
    info.win_options || {}
  );

  window = new (BrowserWindow || remote.BrowserWindow)(options);
  loadURL(window);
  window.webContents.openDevTools();
  window.once("closed", () => {
    window = null;
  });
  window.loadURL(index_html);

  window.webContents.on("will-navigate", (e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  });
  window.webContents.on("new-window", (e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  });

  //   window.webContents.once("dom-ready", () => {
  //     const win_title = info.win_options ? info.win_options.title : null;
  //     delete info.win_options;
  //     info.win_options = { title: win_title };
  //     window.webContents.send("about-window:info", info);
  //     if (info.open_devtools) {
  //       if (process.versions.electron >= "1.4") {
  //         window.webContents.openDevTools({ mode: "detach" });
  //       } else {
  //         window.webContents.openDevTools();
  //       }
  //     }
  //   });

  window.once("ready-to-show", () => {
    window.show();
  });

  window.setMenu(null);

  info = injectInfoFromPackageJson(info);

  return window;
}
