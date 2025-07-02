/**!
 * DragonianVFS
 * @version 1.0
 * @copyright MIT & LGPLv3 License
 * @comment Main development by Drago Cuven
 * Do not remove this comment.
 */

(async function (Scratch) {
    'use strict';
    if (!Scratch.extensions.unsandboxed) {
        throw new Error('"Dragonian Lua" must be ran unsandboxed.');
    }

    const { FS, PATH, PATH_FS } = await import('')
    let ovfs = { root: {} };
    let curdir = '/';
    let lastReadFile = '';


    const extId = 'DragonianVFS';
    let extName = 'Project VFS';
    const { BlockType, ArgumentType, vm } = Scratch;

    function saveVFS() {
        if (typeof vm !== 'undefined' && vm.runtime && vm.runtime.extensionStorage) {
            vm.runtime.extensionStorage[extId] = {
                vfs: vfs,
                curdir: curdir,
                lastReadFile: lastReadFile
            };
        }
    }

    function normalizePath(path, base = curdir) {
        if (!path || path === '' || path === '/') return '/';
        if (path === '.') return base;
        if (path === './') {
            let parts = splitPath(base);
            if (parts.length === 0) return '/';
            parts.pop();
            return '/' + (parts.length ? parts.join('/') : '');
        }
        if (!path.startsWith('/')) path = base.replace(/\/+$/, '') + '/' + path;
        path = path.replace(/\/+/g, '/');
        if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
        const segments = path.split('/');
        const resolved = [];
        for (let seg of segments) {
            if (seg === '' || seg === '.') continue;
            if (seg === '..') {
                if (resolved.length === 0) return null;
                resolved.pop();
            } else {
                resolved.push(seg);
            }
        }
        return '/' + resolved.join('/');
    }

    function splitPath(path) {
        if (!path || path === '/') return [];
        const trimmed = path.replace(/^\/+|\/+$/g, '');
        if (!trimmed) return [];
        return trimmed.split('/');
    }

    function isDir(node) {
        return !!node && typeof node === 'object' && !Array.isArray(node) && node.__isdir === true;
    }

    function isFile(node) {
        return node && typeof node.contents === 'string';
    }

    function getDirNode(path, createDirs = false) {
        if (path === '/' || path === '') return vfs.root;
        const parts = splitPath(path);
        let node = vfs.root;
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (!Object.prototype.hasOwnProperty.call(node, part)) {
                if (createDirs) {
                    node[part] = { __isdir: true };
                    saveVFS();
                } else {
                    return null;
                }
            }
            node = node[part];
            if (!isDir(node)) return null;
        }
        return node;
    }

    function getFileNode(path) {
        const parts = splitPath(path);
        if (parts.length === 0) return null;
        const fileName = parts.pop();
        const dir = getDirNode('/' + parts.join('/'));
        if (!dir || !dir[fileName] || !isFile(dir[fileName])) return null;
        return dir[fileName];
    }

    function getFileParent(path, createDirs = false) {
        const parts = splitPath(path);
        if (parts.length === 0) return { dir: null, name: '' };
        const name = parts.pop();
        const dir = getDirNode('/' + parts.join('/'), createDirs);
        return { dir, name };
    }

    class Extension {
        getInfo() {
            return {
                id: extId,
                name: extName,
                color1: '#c9a53f',
                blocks: [
                    {
                        blockType: BlockType.LABEL,
                        text: 'Focus & Navigation'
                    },
                    {
                        opcode: 'setCurDir',
                        blockType: BlockType.COMMAND,
                        text: 'set current directory to [PATH]',
                        arguments: {
                            PATH: { type: ArgumentType.STRING, defaultValue: '' }
                        }
                    },
                    {
                        opcode: 'forceDir',
                        blockType: BlockType.COMMAND,
                        text: 'force directory [PATH]',
                        arguments: {
                            PATH: { type: ArgumentType.STRING, defaultValue: 'folder/subfolder' }
                        }
                    },
                    {
                        opcode: 'gotoDir',
                        blockType: BlockType.COMMAND,
                        text: 'go to [DIR] directory',
                        arguments: {
                            DIR: {
                                type: ArgumentType.STRING,
                                menu: 'gotoDirMenu',
                                defaultValue: 'parent'
                            }
                        }
                    },
                    {
                        opcode: 'currentDir',
                        blockType: BlockType.REPORTER,
                        text: 'current directory'
                    },
                    {
                        opcode: 'dirContents',
                        blockType: BlockType.REPORTER,
                        text: 'contents of [DIR]',
                        arguments: {
                            DIR: { type: ArgumentType.STRING, defaultValue: '' }
                        }
                    },
                    {
                        opcode: 'assetExistsInDir',
                        blockType: BlockType.BOOLEAN,
                        text: '[ASSET] exist in directory [PATH]?',
                        arguments: {
                            ASSET: {
                                type: ArgumentType.STRING,
                                menu: 'assetType',
                                defaultValue: 'files'
                            },
                            PATH: { type: ArgumentType.STRING, defaultValue: '' }
                        }
                    },
                    {
                        opcode: 'assetsInDir',
                        blockType: BlockType.REPORTER,
                        text: '[ASSET]s in directory [PATH]',
                        arguments: {
                            ASSET: {
                                type: ArgumentType.STRING,
                                menu: 'assetType',
                                defaultValue: 'files'
                            },
                            PATH: { type: ArgumentType.STRING, defaultValue: '' }
                        }
                    },
                    {
                        opcode: 'lastReadFile',
                        blockType: BlockType.REPORTER,
                        text: 'last read file'
                    },
                    "---",
                    {
                        blockType: BlockType.LABEL,
                        text: 'File Operations'
                    },
                    {
                        opcode: 'createFile',
                        blockType: BlockType.COMMAND,
                        text: 'create file [PATH] with contents [CONTENTS]',
                        arguments: {
                            PATH: { type: ArgumentType.STRING, defaultValue: 'file.txt' },
                            CONTENTS: { type: ArgumentType.STRING, defaultValue: '' }
                        }
                    },
                    {
                        opcode: 'deleteFile',
                        blockType: BlockType.COMMAND,
                        text: 'delete file [PATH]',
                        arguments: {
                            PATH: { type: ArgumentType.STRING, defaultValue: 'file.txt' }
                        }
                    },
                    {
                        opcode: 'editFile',
                        blockType: BlockType.COMMAND,
                        text: 'edit file [PATH] set contents to [CONTENTS]',
                        arguments: {
                            PATH: { type: ArgumentType.STRING, defaultValue: 'file.txt' },
                            CONTENTS: { type: ArgumentType.STRING, defaultValue: '' }
                        }
                    },
                    {
                        opcode: 'readFile',
                        blockType: BlockType.REPORTER,
                        text: 'read file [PATH]',
                        arguments: {
                            PATH: { type: ArgumentType.STRING, defaultValue: 'file.txt' }
                        }
                    },
                    {
                        opcode: 'copyFile',
                        blockType: BlockType.COMMAND,
                        text: 'copy file from [SRC] to [DEST]',
                        arguments: {
                            SRC: { type: ArgumentType.STRING, defaultValue: 'file.txt' },
                            DEST: { type: ArgumentType.STRING, defaultValue: 'copy.txt' }
                        }
                    },
                    {
                        opcode: 'moveFile',
                        blockType: BlockType.COMMAND,
                        text: 'move file from [SRC] to [DEST]',
                        arguments: {
                            SRC: { type: ArgumentType.STRING, defaultValue: 'file.txt' },
                            DEST: { type: ArgumentType.STRING, defaultValue: 'moved.txt' }
                        }
                    },
                    "---",
                    {
                        blockType: BlockType.LABEL,
                        text: 'Directory Operations'
                    },
                    {
                        opcode: 'createDir',
                        blockType: BlockType.COMMAND,
                        text: 'create directory [PATH]',
                        arguments: {
                            PATH: { type: ArgumentType.STRING, defaultValue: 'folder' }
                        }
                    },
                    {
                        opcode: 'deleteDir',
                        blockType: BlockType.COMMAND,
                        text: 'delete directory [PATH]',
                        arguments: {
                            PATH: { type: ArgumentType.STRING, defaultValue: 'folder' }
                        }
                    },
                    {
                        opcode: 'listDir',
                        blockType: BlockType.REPORTER,
                        text: 'list directory [PATH]',
                        arguments: {
                            PATH: { type: ArgumentType.STRING, defaultValue: '' }
                        }
                    },
                    {
                        opcode: 'dirExists',
                        blockType: BlockType.BOOLEAN,
                        text: 'directory [PATH] exists?',
                        arguments: {
                            PATH: { type: ArgumentType.STRING, defaultValue: 'folder' }
                        }
                    },
                    "---",
                    {
                        blockType: BlockType.LABEL,
                        text: 'Info & Utility'
                    },
                    {
                        opcode: 'fileExists',
                        blockType: BlockType.BOOLEAN,
                        text: 'file [PATH] exists in [DIR]?',
                        arguments: {
                            PATH: { type: ArgumentType.STRING, defaultValue: 'file.txt' },
                            DIR: { type: ArgumentType.STRING, defaultValue: '' }
                        }
                    },
                    {
                        opcode: 'getFileSize',
                        blockType: BlockType.REPORTER,
                        text: '[TYPE] size of [PATH]',
                        arguments: {
                            TYPE: {
                                type: ArgumentType.STRING,
                                menu: 'sizeType',
                                defaultValue: 'pure'
                            },
                            PATH: { type: ArgumentType.STRING, defaultValue: 'file.txt' }
                        }
                    },
                    {
                        opcode: 'getFileType',
                        blockType: BlockType.REPORTER,
                        text: 'type of [PATH]',
                        arguments: {
                            PATH: { type: ArgumentType.STRING, defaultValue: 'file.txt' }
                        }
                    },
                    "---",
                    {
                        blockType: BlockType.LABEL,
                        text: 'Danger Zone'
                    },
                    {
                        opcode: 'deleteAllFiles',
                        blockType: BlockType.COMMAND,
                        text: 'delete all files and folders'
                    },
                    {
                        opcode: 'rawSystem',
                        blockType: BlockType.REPORTER,
                        text: 'raw system'
                    }
                ],
                menus: {
                    sizeType: {
                        acceptReporters: true,
                        items: ['pure', 'formatted']
                    },
                    gotoDirMenu: {
                        acceptReporters: true,
                        items: ['parent', 'root']
                    },
                    assetType: {
                        acceptReporters: true,
                        items: ['files', 'folders', 'anything']
                    }
                }
            };
        }

        setCurDir(args) {
            let path = args.PATH;
            if (!path || path === '' || path === '/') {
                curdir = '/';
                saveVFS();
                return;
            }
            if (path === './') {
                let parts = splitPath(curdir);
                if (parts.length === 0) {
                    curdir = '/';
                } else {
                    parts.pop();
                    curdir = '/' + (parts.length ? parts.join('/') + '/' : '');
                }
                saveVFS();
                return;
            }
            let norm = normalizePath(path, curdir);
            if (norm === null) return;
            let node = getDirNode(norm, false);
            if (node && isDir(node)) {
                curdir = norm.endsWith('/') ? norm : norm + '/';
                if (curdir !== '/') curdir = curdir.replace(/\/+$/, '/');
                saveVFS();
            }
        }

        forceDir(args) {
            let path = args.PATH;
            if (!path || path === '' || path === '/') {
                curdir = '/';
                getDirNode('/', true);
                saveVFS();
                return;
            }
            if (path === './') {
                let parts = splitPath(curdir);
                if (parts.length === 0) {
                    curdir = '/';
                } else {
                    parts.pop();
                    curdir = '/' + (parts.length ? parts.join('/') + '/' : '');
                }
                getDirNode(curdir, true);
                saveVFS();
                return;
            }
            let norm = normalizePath(path, curdir);
            getDirNode(norm, true);
            curdir = norm + (norm === '/' ? '' : '/');
            saveVFS();
        }

        gotoDir(args) {
            let dir = args.DIR;
            if (!dir || dir === '' || dir === '/') {
                curdir = '/';
                saveVFS();
                return;
            }
            if (dir === './') {
                let parts = splitPath(curdir);
                if (parts.length === 0) {
                    curdir = '/';
                } else {
                    parts.pop();
                    curdir = '/' + (parts.length ? parts.join('/') + '/' : '');
                }
                saveVFS();
                return;
            }
            if (dir === 'parent') {
                if (curdir === '/') return;
                let parts = splitPath(curdir);
                parts.pop();
                curdir = '/' + (parts.length ? parts.join('/') + '/' : '');
                saveVFS();
                return;
            }
            if (dir === 'root') {
                curdir = '/';
                saveVFS();
                return;
            }
            let norm = normalizePath(dir, curdir);
            let node = getDirNode(norm, false);
            if (node && isDir(node)) {
                curdir = norm.endsWith('/') ? norm : norm + '/';
                if (curdir !== '/') curdir = curdir.replace(/\/+$/, '/');
                saveVFS();
            }
        }

        currentDir() {
            return curdir;
        }

        dirContents(args) {
            let path = args.DIR;
            // blank or "/" means root
            if (!path || path === '' || path === '/') {
                path = '/';
            } else if (path === './') {
                // If current dir is root, stay at root
                if (curdir === '/' || curdir === '') {
                    path = '/';
                } else {
                    let parts = splitPath(curdir);
                    if (parts.length === 0) path = '/';
                    else {
                        parts.pop();
                        path = '/' + (parts.length ? parts.join('/') : '');
                    }
                }
            }
            let norm = normalizePath(path, curdir);
            let node = getDirNode(norm);
            if (!node || !isDir(node)) return "[]";
            let result = [];
            for (let k of Object.keys(node)) {
                if (k === '__isdir') continue;
                if (isDir(node[k])) result.push(k + '/');
                else if (isFile(node[k])) result.push(k);
            }
            return JSON.stringify(result);
        }

        assetExistsInDir(args) {
            let path = args.PATH;
            let norm = normalizePath(path, curdir);
            let node = getDirNode(norm);
            if (!node || !isDir(node)) return false;
            let type = args.ASSET;
            for (let k of Object.keys(node)) {
                if (k === '__isdir') continue;
                if (type === 'files' && isFile(node[k])) return true;
                if (type === 'folders' && isDir(node[k])) return true;
                if (type === 'anything' && (isFile(node[k]) || isDir(node[k]))) return true;
            }
            return false;
        }

        assetsInDir(args) {
            let path = args.PATH;
            if (!path || path === '' || path === '/') path = '/';
            else if (path === './') {
                let parts = splitPath(curdir);
                if (parts.length === 0) path = '/';
                else {
                    parts.pop();
                    path = '/' + (parts.length ? parts.join('/') : '');
                }
            }
            let norm = normalizePath(path, curdir);
            let node = getDirNode(norm);
            if (!node || !isDir(node)) return "[]";
            let files = [], folders = [];
            for (let k of Object.keys(node)) {
                if (k === '__isdir') continue;
                if (isDir(node[k])) folders.push(k);
                else if (isFile(node[k])) files.push(k);
            }
            let result;
            if (args.ASSET === 'files') result = files;
            else if (args.ASSET === 'folders') result = folders;
            else if (args.ASSET === 'anything') result = files.concat(folders);
            else result = [];
            return JSON.stringify(result);
        }

        lastReadFile() {
            return lastReadFile;
        }

        createFile(args) {
            let path = normalizePath(args.PATH, curdir);
            let { dir, name } = getFileParent(path, true);
            if (!dir || !name) return;
            dir[name] = { contents: args.CONTENTS };
            saveVFS();
        }

        deleteFile(args) {
            let path = normalizePath(args.PATH, curdir);
            let { dir, name } = getFileParent(path, false);
            if (!dir || !name) return;
            if (dir[name] && isFile(dir[name])) {
                delete dir[name];
                saveVFS();
            }
        }

        editFile(args) {
            let path = normalizePath(args.PATH, curdir);
            let node = getFileNode(path);
            if (node && isFile(node)) {
                node.contents = args.CONTENTS;
                saveVFS();
            }
        }

        readFile(args) {
            let path = normalizePath(args.PATH, curdir);
            let node = getFileNode(path);
            if (!node || !isFile(node)) return '';
            lastReadFile = path;
            saveVFS();
            return node.contents;
        }

        copyFile(args) {
            let srcPath = normalizePath(args.SRC, curdir);
            let destPath = normalizePath(args.DEST, curdir);
            let srcNode = getFileNode(srcPath);
            if (!srcNode || !isFile(srcNode)) return;
            let { dir, name } = getFileParent(destPath, true);
            if (!dir || !name) return;
            dir[name] = { contents: srcNode.contents };
            saveVFS();
        }

        moveFile(args) {
            let srcPath = normalizePath(args.SRC, curdir);
            let destPath = normalizePath(args.DEST, curdir);
            let srcNode = getFileNode(srcPath);
            if (!srcNode || !isFile(srcNode)) return;
            let { dir: destDir, name: destName } = getFileParent(destPath, true);
            if (!destDir || !destName) return;
            destDir[destName] = { contents: srcNode.contents };
            let { dir: srcDir, name: srcName } = getFileParent(srcPath, false);
            if (srcDir && srcName && srcDir[srcName]) delete srcDir[srcName];
            saveVFS();
        }

        createDir(args) {
            let path = normalizePath(args.PATH, curdir);
            getDirNode(path, true);
            saveVFS();
        }

        deleteDir(args) {
            let path = normalizePath(args.PATH, curdir);
            if (path === '/' || path === '') return;
            let { dir, name } = getFileParent(path, false);
            if (!dir || !name) return;
            if (dir[name] && isDir(dir[name])) {
                delete dir[name];
                saveVFS();
            }
        }

        listDir(args) {
            let path = args.PATH;
            if (!path || path === '' || path === '/') path = '/';
            else if (path === './') {
                let parts = splitPath(curdir);
                if (parts.length === 0) path = '/';
                else {
                    parts.pop();
                    path = '/' + (parts.length ? parts.join('/') : '');
                }
            }
            let norm = normalizePath(path, curdir);
            let node = getDirNode(norm);
            if (!node || !isDir(node)) return "[]";
            return JSON.stringify(Object.keys(node).filter((k) => k !== '__isdir'));
        }

        dirExists(args) {
            let path = args.PATH;
            if (!path || path === '' || path === '/') path = '/';
            else if (path === './') {
                let parts = splitPath(curdir);
                if (parts.length === 0) path = '/';
                else {
                    parts.pop();
                    path = '/' + (parts.length ? parts.join('/') : '');
                }
            }
            let norm = normalizePath(path, curdir);
            let node = getDirNode(norm);
            return !!node && isDir(node);
        }

        fileExists(args) {
            let dirPath = normalizePath(args.DIR, curdir);
            let dirNode = getDirNode(dirPath);
            if (!dirNode || !isDir(dirNode)) return false;
            let fileName = args.PATH;
            return !!dirNode[fileName] && isFile(dirNode[fileName]);
        }

        getFileSize(args) {
            let path = normalizePath(args.PATH, curdir);
            let node = getFileNode(path);
            if (!node || !isFile(node)) return 0;
            let size = node.contents.length;
            if (args.TYPE === 'formatted') {
                const units = ['B', 'KB', 'MB', 'GB', 'TB'];
                let i = 0;
                while (size >= 1024 && i < units.length - 1) {
                    size /= 1024;
                    i++;
                }
                return `${size.toFixed(2)} ${units[i]}`;
            }
            return size;
        }

        getFileType(args) {
            let path = normalizePath(args.PATH, curdir);
            let node = getDirNode(path);
            if (!node) return 'none';
            if (isDir(node)) return 'directory';
            if (isFile(node)) return 'file';
            return 'unknown';
        }

        deleteAllFiles() {
            vfs.root = {};
            saveVFS();
        }

        rawSystem() {
            return JSON.stringify(vfs);
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);