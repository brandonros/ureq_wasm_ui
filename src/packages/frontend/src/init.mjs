import { start, ureqTest } from 'backend';

document.querySelector('#submit').addEventListener('click', async (event) => {
    try {
        console.log(ureqTest())
    } catch (err) {
        console.error(err)
    }
});
