// Made by Drago Cuven
(function(Scratch) {
    'use strict';

    // Check if Node.js is available
    const hasNodeJS = typeof process !== 'undefined' && process.versions && process.versions.node;
    
    let fs, path, os;
    if (hasNodeJS) {
        fs = require('fs');
        path = require('path');
        os = require('os');
    }

    class NodeFilesExtension {
        constructor() {
            // Only set up focus directory if Node.js is available
            if (hasNodeJS) {
                this.focusDirectory = path.dirname(process.execPath);
                process.chdir(this.focusDirectory);
            } else {
                this.focusDirectory = '';
            }
        }

        getInfo() {
            return {
                id: 'nodeFiles',
                name: 'Node Files',
                color1: '#66b94a',
                color2: '#deaa30ff',
                color3: '#3f863f',
                blocks: [
                    // NodeJS
                    {
                        opcode: 'isNodeJS',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'node.js available?'
                    },
                    {
                        opcode: 'nodeVersion',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'node.js version',
                        allowDropAnywhere: true
                    },
                    {
                        opcode: 'currentUser',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'current user',
                        allowDropAnywhere: true
                    },

                    // Directory
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Directory'
                    },
                    {
                        opcode: 'setFocusDirectory',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set focus directory to [directory]',
                        arguments: {
                            directory: { type: Scratch.ArgumentType.STRING, defaultValue: '.' }
                        }
                    },
                    {
                        opcode: 'getFocusDirectory',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'focus directory',
                        allowDropAnywhere: true
                    },
                    {
                        opcode: 'directoryBookmark',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[type] directory',
                        allowDropAnywhere: true,
                        arguments: {
                            type: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'directoryBookmarks',
                                defaultValue: 'documents'
                            }
                        }
                    },
                    {
                        opcode: 'readFile',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'read file [filename]',
                        allowDropAnywhere: true,
                        arguments: {
                            filename: { type: Scratch.ArgumentType.STRING, defaultValue: 'test.txt' }
                        }
                    },
                    {
                        opcode: 'endFolderOfDirectory',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'end folder of [directory]',
                        allowDropAnywhere: true,
                        arguments: {
                            directory: { type: Scratch.ArgumentType.STRING, defaultValue: '.' }
                        }
                    },
                    {
                        opcode: 'writeFile',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'write [content] to file [filename]',
                        arguments: {
                            content: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello World' },
                            filename: { type: Scratch.ArgumentType.STRING, defaultValue: 'test.txt' }
                        }
                    },
                    {
                        opcode: 'appendFile',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'append [content] to file [filename]',
                        arguments: {
                            content: { type: Scratch.ArgumentType.STRING, defaultValue: 'Append this' },
                            filename: { type: Scratch.ArgumentType.STRING, defaultValue: 'test.txt' }
                        }
                    },
                    {
                        opcode: 'createFolder',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'create folder [foldername]',
                        arguments: {
                            foldername: { type: Scratch.ArgumentType.STRING, defaultValue: 'NewFolder' }
                        }
                    },
                    {
                        opcode: 'deleteFile',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'delete file [filename]',
                        arguments: {
                            filename: { type: Scratch.ArgumentType.STRING, defaultValue: 'test.txt' }
                        }
                    },
                    {
                        opcode: 'deleteFolder',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'delete folder [foldername]',
                        arguments: {
                            foldername: { type: Scratch.ArgumentType.STRING, defaultValue: 'NewFolder' }
                        }
                    },
                    {
                        opcode: 'copyFile',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'copy file [source] to [dest]',
                        arguments: {
                            source: { type: Scratch.ArgumentType.STRING, defaultValue: 'test.txt' },
                            dest: { type: Scratch.ArgumentType.STRING, defaultValue: 'copy.txt' }
                        }
                    },
                    {
                        opcode: 'moveFile',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'move file [source] to [dest]',
                        arguments: {
                            source: { type: Scratch.ArgumentType.STRING, defaultValue: 'test.txt' },
                            dest: { type: Scratch.ArgumentType.STRING, defaultValue: 'moved.txt' }
                        }
                    },
                    {
                        opcode: 'allInDirectory',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'all [type] in [directory] [extension]',
                        allowDropAnywhere: true,
                        arguments: {
                            type: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'contentType',
                                defaultValue: 'files'
                            },
                            directory: { type: Scratch.ArgumentType.STRING, defaultValue: '.' },
                            extension: {
                                type: Scratch.ArgumentType.STRING, 
                                menu: 'extensionType',
                                defaultValue: 'with extension'
                            }
                        }
                    },
                    {
                        opcode: 'allFoldersInDirectory',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'all folders in [directory]',
                        allowDropAnywhere: true,
                        arguments: {
                            directory: { type: Scratch.ArgumentType.STRING, defaultValue: '.' }
                        }
                    },
                    {
                        opcode: 'fileSize',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'size of file [name] in [format]',
                        allowDropAnywhere: true,
                        arguments: {
                            name: { type: Scratch.ArgumentType.STRING, defaultValue: 'test.txt' },
                            format: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'sizeFormat',
                                defaultValue: 'KB'
                            }
                        }
                    },
                    {
                        opcode: 'fileExists',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'file [filename] exists?',
                        arguments: {
                            filename: { type: Scratch.ArgumentType.STRING, defaultValue: 'test.txt' }
                        }
                    },
                    {
                        opcode: 'folderExists',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'folder [foldername] exists?',
                        arguments: {
                            foldername: { type: Scratch.ArgumentType.STRING, defaultValue: 'NewFolder' }
                        }
                    },

                    // Computer info
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Computer info'
                    },
                    {
                        opcode: 'storageDevices',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'storage devices',
                        allowDropAnywhere: true
                    },
                    {
                        opcode: 'totalStorage',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'total storage of [device] in [format]',
                        allowDropAnywhere: true,
                        arguments: {
                            device: { 
                                type: Scratch.ArgumentType.STRING, 
                                menu: 'storageDevicesMenu',
                                defaultValue: '/'
                            },
                            format: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'sizeFormat',
                                defaultValue: 'GB'
                            }
                        }
                    },
                    {
                        opcode: 'freeStorage',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'free storage of [device] in [format]',
                        allowDropAnywhere: true,
                        arguments: {
                            device: { 
                                type: Scratch.ArgumentType.STRING, 
                                menu: 'storageDevicesMenu',
                                defaultValue: '/'
                            },
                            format: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'sizeFormat',
                                defaultValue: 'GB'
                            }
                        }
                    },
                    {
                        opcode: 'getOsType',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'os type',
                        allowDropAnywhere: true
                    },
                    {
                        opcode: 'getPlatform',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'os platform',
                        allowDropAnywhere: true
                    },
                    {
                        opcode: 'getCpuArch',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'cpu architecture',
                        allowDropAnywhere: true
                    },
                    {
                        opcode: 'getTotalMem',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'total memory',
                        allowDropAnywhere: true
                    },
                    {
                        opcode: 'getFreeMem',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'free memory',
                        allowDropAnywhere: true
                    },
                    {
                        opcode: 'getUptime',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'system uptime (seconds)',
                        allowDropAnywhere: true
                    },

                    // Environment
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Environment'
                    },
                    {
                        opcode: 'getEnv',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'environment variable [name]',
                        allowDropAnywhere: true,
                        arguments: {
                            name: { type: Scratch.ArgumentType.STRING, defaultValue: 'PATH' }
                        }
                    },
                    {
                        opcode: 'setEnv',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set environment variable [name] to [value]',
                        arguments: {
                            name: { type: Scratch.ArgumentType.STRING, defaultValue: 'MY_VAR' },
                            value: { type: Scratch.ArgumentType.STRING, defaultValue: '' }
                        }
                    },
                    {
                        opcode: 'deleteEnv',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'delete environment variable [name]',
                        arguments: {
                            name: { type: Scratch.ArgumentType.STRING, defaultValue: 'MY_VAR' }
                        }
                    },
                    {
                        opcode: 'listEnv',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'all environment variables',
                        allowDropAnywhere: true
                    }
                ],
                menus: {
                    contentType: {
                        acceptReporters: true,
                        items: ['files', 'media', 'images', 'videos', 'context files', 'code files']
                    },
                    extensionType: {
                        acceptReporters: true,
                        items: ['with extension', 'without extension']
                    },
                    sizeFormat: {
                        acceptReporters: true,
                        items: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
                    },
                    storageDevicesMenu: {
                        acceptReporters: true,
                        items: 'getStorageDevicesArray'
                    },
                    directoryBookmarks: {
                        acceptReporters: true,
                        items: ['current executable', 'root', 'user', 'appdata', 'localdata', 'download', 'documents']
                    }
                }
            };
        }

        // Helper functions - only work if Node.js is available
        _resolveFilePath(filename) {
            if (!hasNodeJS) return '';
            const fixedPath = filename.replace(/\\/g, '/');
            if (path.isAbsolute(fixedPath)) {
                return path.resolve(fixedPath);
            }
            return path.resolve(this.focusDirectory, fixedPath);
        }

        _convertBytes(bytes, format) {
            const sizes = {
                'B': 1, 'KB': 1024, 'MB': 1024 * 1024, 'GB': 1024 * 1024 * 1024,
                'TB': 1024 * 1024 * 1024 * 1024, 'PB': 1024 * 1024 * 1024 * 1024 * 1024,
                'EB': 1024 * 1024 * 1024 * 1024 * 1024 * 1024,
                'ZB': 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024,
                'YB': 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024
            };
            const size = sizes[format.toUpperCase()] || sizes['B'];
            return bytes / size;
        }

        // Storage devices functions
        getStorageDevicesArray() {
            if (!hasNodeJS) return [];
            try {
                const devices = [];
                const platform = os.platform();
                
                if (platform === 'win32') {
                    for (let i = 65; i <= 90; i++) {
                        const drive = String.fromCharCode(i) + ':\\';
                        try {
                            fs.accessSync(drive);
                            devices.push(drive);
                        } catch (e) {}
                    }
                } else {
                    const commonMounts = ['/', '/home', '/mnt', '/media', '/Volumes'];
                    for (const mount of commonMounts) {
                        try {
                            if (fs.existsSync(mount)) {
                                devices.push(mount);
                            }
                        } catch (e) {}
                    }
                    
                    if (platform === 'linux') {
                        try {
                            if (fs.existsSync('/etc/fstab')) {
                                const fstab = fs.readFileSync('/etc/fstab', 'utf8');
                                const lines = fstab.split('\n');
                                for (const line of lines) {
                                    if (line.trim() && !line.startsWith('#')) {
                                        const parts = line.split(/\s+/);
                                        if (parts.length >= 2 && parts[1].startsWith('/')) {
                                            const mountPoint = parts[1];
                                            if (fs.existsSync(mountPoint) && !devices.includes(mountPoint)) {
                                                devices.push(mountPoint);
                                            }
                                        }
                                    }
                                }
                            }
                        } catch (e) {}
                    }
                }
                return devices;
            } catch (error) {
                return [];
            }
        }

        // Directory bookmark function
        directoryBookmark({ type }) {
            if (!hasNodeJS) return '';
            try {
                const platform = os.platform();
                const homedir = os.homedir();
                
                switch (type) {
                    case 'current executable':
                        return path.dirname(process.execPath);
                    case 'root':
                        return platform === 'win32' ? 'C:\\' : '/';
                    case 'user':
                        return homedir;
                    case 'appdata':
                        if (platform === 'win32') {
                            return process.env.APPDATA || path.join(homedir, 'AppData', 'Roaming');
                        } else if (platform === 'darwin') {
                            return path.join(homedir, 'Library', 'Application Support');
                        } else {
                            return process.env.XDG_CONFIG_HOME || path.join(homedir, '.config');
                        }
                    case 'localdata':
                        if (platform === 'win32') {
                            return process.env.LOCALAPPDATA || path.join(homedir, 'AppData', 'Local');
                        } else if (platform === 'darwin') {
                            return path.join(homedir, 'Library', 'Application Support');
                        } else {
                            return process.env.XDG_DATA_HOME || path.join(homedir, '.local', 'share');
                        }
                    case 'download':
                        if (platform === 'win32') {
                            return path.join(homedir, 'Downloads');
                        } else if (platform === 'darwin') {
                            return path.join(homedir, 'Downloads');
                        } else {
                            return path.join(homedir, 'Downloads');
                        }
                    case 'documents':
                        if (platform === 'win32') {
                            return path.join(homedir, 'Documents');
                        } else if (platform === 'darwin') {
                            return path.join(homedir, 'Documents');
                        } else {
                            return path.join(homedir, 'Documents');
                        }
                    default:
                        return '';
                }
            } catch (error) {
                return '';
            }
        }

        // NodeJS blocks
        isNodeJS() { return hasNodeJS != null; }
        
        nodeVersion() { 
            return hasNodeJS ? process.versions.node : '';
        }
        
        currentUser() { 
            if (!hasNodeJS) return '';
            try {
                return os.userInfo().username;
            } catch (error) {
                return '';
            }
        }

        // Directory blocks
        setFocusDirectory({ directory }) {
            if (!hasNodeJS) return '';
            try {
                const newDir = path.resolve(directory);
                if (fs.existsSync(newDir) && fs.statSync(newDir).isDirectory()) {
                    this.focusDirectory = newDir;
                    process.chdir(newDir);
                }
                return '';
            } catch (error) {
                return '';
            }
        }

        getFocusDirectory() { 
            return hasNodeJS ? this.focusDirectory : '';
        }

        readFile({ filename }) {
            if (!hasNodeJS) return '';
            try {
                const filePath = this._resolveFilePath(filename);
                return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
            } catch (error) {
                return '';
            }
        }

        endFolderOfDirectory({ directory }) {
            if (!hasNodeJS) return '';
            try {
                const resolvedPath = path.resolve(directory);
                return path.basename(resolvedPath);
            } catch (error) {
                return '';
            }
        }

        writeFile({ content, filename }) {
            if (!hasNodeJS) return '';
            try {
                const filePath = this._resolveFilePath(filename);
                fs.writeFileSync(filePath, content);
                return '';
            } catch (error) {
                return '';
            }
        }

        appendFile({ content, filename }) {
            if (!hasNodeJS) return '';
            try {
                const filePath = this._resolveFilePath(filename);
                fs.appendFileSync(filePath, content);
                return '';
            } catch (error) {
                return '';
            }
        }

        createFolder({ foldername }) {
            if (!hasNodeJS) return '';
            try {
                const folderPath = this._resolveFilePath(foldername);
                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath, { recursive: true });
                }
                return '';
            } catch (error) {
                return '';
            }
        }

        deleteFile({ filename }) {
            if (!hasNodeJS) return '';
            try {
                const filePath = this._resolveFilePath(filename);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                return '';
            } catch (error) {
                return '';
            }
        }

        deleteFolder({ foldername }) {
            if (!hasNodeJS) return '';
            try {
                const folderPath = this._resolveFilePath(foldername);
                if (fs.existsSync(folderPath)) {
                    fs.rmSync(folderPath, { recursive: true, force: true });
                }
                return '';
            } catch (error) {
                return '';
            }
        }

        copyFile({ source, dest }) {
            if (!hasNodeJS) return '';
            try {
                const sourcePath = this._resolveFilePath(source);
                const destPath = this._resolveFilePath(dest);
                fs.copyFileSync(sourcePath, destPath);
                return '';
            } catch (error) {
                return '';
            }
        }

        moveFile({ source, dest }) {
            if (!hasNodeJS) return '';
            try {
                const sourcePath = this._resolveFilePath(source);
                const destPath = this._resolveFilePath(dest);
                if (fs.existsSync(sourcePath)) {
                    fs.renameSync(sourcePath, destPath);
                }
                return '';
            } catch (error) {
                return '';
            }
        }

        allInDirectory({ type, directory, extension }) {
            if (!hasNodeJS) return '[]';
            try {
                const dir = path.resolve(directory);
                if (!fs.existsSync(dir)) return '[]';
                
                const items = fs.readdirSync(dir);
                const showExtension = extension === 'with extension';
                
                let filteredItems = items.filter(item => {
                    const fullPath = path.join(dir, item);
                    if (!fs.statSync(fullPath).isFile()) return false;
                    
                    const ext = path.extname(item).toLowerCase();
                    
                    switch (type.toLowerCase()) {
                        case 'files': return true;
                        case 'media': return ['.mp3', '.wav', '.ogg', '.aac', '.flac', '.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm'].includes(ext);
                        case 'images': return ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'].includes(ext);
                        case 'videos': return ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv'].includes(ext);
                        case 'context files': return ['.json', '.xml', '.txt', '.csv', '.ini', '.cfg', '.conf', '.yaml', '.yml', '.properties'].includes(ext);
                        case 'code files': return ['.js', '.lua', '.hx', '.py', '.java', '.c', '.cpp', '.h', '.cs', '.php', '.html', '.css', '.ts', '.rs', '.go', '.rb', '.pl', '.sh', '.bat', '.ps1', '.md'].includes(ext);
                        default: return ext === `.${type.toLowerCase()}`;
                    }
                });
                
                if (!showExtension) {
                    filteredItems = filteredItems.map(item => path.basename(item, path.extname(item)));
                }
                
                return JSON.stringify(filteredItems);
            } catch (error) {
                return '[]';
            }
        }

        allFoldersInDirectory({ directory }) {
            if (!hasNodeJS) return '[]';
            try {
                const dir = path.resolve(directory);
                if (!fs.existsSync(dir)) return '[]';
                
                const items = fs.readdirSync(dir);
                const folders = items.filter(item => {
                    const fullPath = path.join(dir, item);
                    return fs.statSync(fullPath).isDirectory();
                });
                
                return JSON.stringify(folders);
            } catch (error) {
                return '[]';
            }
        }

        fileSize({ name, format }) {
            if (!hasNodeJS) return 0;
            try {
                const filePath = this._resolveFilePath(name);
                if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
                    return 0;
                }
                const stats = fs.statSync(filePath);
                return this._convertBytes(stats.size, format);
            } catch (error) {
                return 0;
            }
        }

        fileExists({ filename }) {
            if (!hasNodeJS) return false;
            try {
                const filePath = this._resolveFilePath(filename);
                return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
            } catch (error) {
                return false;
            }
        }

        folderExists({ foldername }) {
            if (!hasNodeJS) return false;
            try {
                const folderPath = this._resolveFilePath(foldername);
                return fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory();
            } catch (error) {
                return false;
            }
        }

        // Storage devices reporter
        storageDevices() {
            return JSON.stringify(this.getStorageDevicesArray());
        }

        // Storage stuff
        totalStorage({ device, format }) {
            if (!hasNodeJS) return 0;
            try {
                const stats = fs.statfsSync(device);
                const totalBytes = stats.bsize * stats.blocks;
                return this._convertBytes(totalBytes, format);
            } catch (error) {
                return 0;
            }
        }

        freeStorage({ device, format }) {
            if (!hasNodeJS) return 0;
            try {
                const stats = fs.statfsSync(device);
                const freeBytes = stats.bsize * stats.bfree;
                return this._convertBytes(freeBytes, format);
            } catch (error) {
                return 0;
            }
        }

        // System info
        getOsType() {
            return hasNodeJS ? os.type() : '';
        }

        getPlatform() {
            return hasNodeJS ? os.platform() : '';
        }

        getCpuArch() {
            return hasNodeJS ? os.arch() : '';
        }

        getTotalMem() {
            return hasNodeJS ? os.totalmem() : 0;
        }

        getFreeMem() {
            return hasNodeJS ? os.freemem() : 0;
        }

        getUptime() {
            return hasNodeJS ? os.uptime() : 0;
        }

        // Environment stuff
        getEnv({ name }) {
            if (!hasNodeJS) return '';
            try {
                return process.env[name] || '';
            } catch (error) {
                return '';
            }
        }

        setEnv({ name, value }) {
            if (!hasNodeJS) return '';
            try {
                process.env[name] = value;
                return '';
            } catch (error) {
                return '';
            }
        }

        deleteEnv({ name }) {
            if (!hasNodeJS) return '';
            try {
                delete process.env[name];
                return '';
            } catch (error) {
                return '';
            }
        }

        listEnv() {
            if (!hasNodeJS) return '';
            try {
                return Object.entries(process.env)
                    .map(([key, value]) => `${key}=${value}`)
                    .join('\n');
            } catch (error) {
                return '';
            }
        }
    }

    Scratch.extensions.register(new NodeFilesExtension());
})(Scratch);