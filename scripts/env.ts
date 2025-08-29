import fsp from 'fs/promises';
import path from 'path';
import os from 'os';

const defaultPath = (): string => {
  const platform = os.platform();

  if (platform === 'win32') return 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
  if (platform === 'darwin') return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

  return '';
};

await fsp.writeFile(path.join(process.cwd(), '.env'), `BROWSER_PATH=${defaultPath()}`);
