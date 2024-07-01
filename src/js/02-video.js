import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);
if (savedTime) {
    player.setCurrentTime(savedTime).catch(function(error) {
        console.error(error);
    });
}

// Відстеження події timeupdate
player.on('timeupdate', throttle(({ seconds }) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, seconds);
}, 1000));

