import { NodeSSH } from 'node-ssh';
import { greenLog, info, printHelp, alertLog, readConfig, redLog, } from './utils/index.js';
import path from 'path';
const CMD = 'deploy';
const onError = (error) => printHelp(CMD, { error });
export const taskDeploy = async (config) => {
    info('title', 'Task: DEPLOY');
    const { deployConfigPath, dev, distDir } = config;
    const mode = dev ? 'dev' : 'prod';
    if (!dev) {
        alertLog('Production');
    }
    const deployConfig = readConfig(deployConfigPath);
    if (!config)
        onError(`Does not have deploy configuration for '${mode}' mode`);
    const sshPath = deployConfig[mode].path;
    const sshConf = deployConfig[mode].ssh;
    const concurrency = deployConfig[mode].concurrency ?? 10;
    if (!sshConf)
        onError(`Does not have ssh configuration for '${mode}' mode`);
    if (!sshPath)
        onError(`Does not have ssh path for '${mode}' mode`);
    const ssh = new NodeSSH();
    await ssh.connect(sshConf);
    // Clean directory
    await ssh.execCommand(`rm -r ./*`, { cwd: sshPath });
    // Putting dist directory
    const status = await ssh.putDirectory(distDir, sshPath, {
        recursive: true,
        // ^ WARNING: Not all servers support high concurrency
        // try a bunch of values and see what works on your server
        concurrency,
        validate: function (itemPath) {
            const baseName = path.basename(itemPath);
            return (
            // do not allow dot files
            baseName.substring(0, 1) !== '.' &&
                // do not allow node_modules
                baseName !== 'node_modules');
        },
        tick: function (localPath, _, error) {
            if (error) {
                redLog(localPath.split(distDir)?.[1] ?? localPath);
            }
            else {
                greenLog(localPath.split(distDir)?.[1] ?? localPath);
            }
        },
    });
    if (!ssh) {
        return;
    }
    ssh.connection?.end();
    console.info('the directory transfer was', status ? 'successful' : 'failed');
};
