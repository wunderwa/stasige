import { getArgv, minActions, printHelp } from './core/utils/index.js';
import { existsSync } from 'node:fs';
const list = [
    '- yarn fmt',
    '- yarn fmt:site 〈site〉',
    '- yarn fmt:check',
    '- yarn man 〈cmd〉',
    '- yarn copy 〈new-site-name〉',
    '- yarn new -c 〈site〉 〈path:lang〉',
    '- yarn vars -c 〈site〉 〈path:lang〉 〈list〉',
    '- yarn srv -c -D -p 〈port〉 〈site〉',
    '- yarn wrk -b -d -DCSJHI 〈site〉',
    '- yarn doc',
    '- yarn logo',
];
const argv = getArgv();
const cmd = argv._[0] ?? '';
minActions('man', argv);
if (cmd == '') {
    console.log(list.join('\n'));
}
else if (existsSync(`src/help/yarn-${cmd}.txt`)) {
    printHelp(cmd);
}
else {
    printHelp('man', {
        error: `Unknown command: ${cmd}`,
    });
}
