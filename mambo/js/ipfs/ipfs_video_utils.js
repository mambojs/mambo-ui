


async function addAll(ipfs) {
    'use strict';

    const files = [
        {
            path: "file.name",
            content: "file"
        }
    ];
    /*const files = Array.from(event.dataTransfer.items)
        .filter(item => item.kind === 'file')
        .map(item => item.getAsFile())
        .map(file => {
            return {
                path: file.name,
                content: file
            }
        })*/

    for await (const added of ipfs.addAll(files, {
        progress: (addedBytes) => {
        }
    })) {
        document.querySelector('#cid').value = added.cid.toString();
    }
}

function createVideoElement() {
    const videoElement = document.getElementById('video');
    videoElement.addEventListener('loadedmetadata', () => {
        videoElement.play();
    });

    const events = [
        'playing',
        'waiting',
        'seeking',
        'seeked',
        'ended',
        'loadedmetadata',
        'loadeddata',
        'canplay',
        'canplaythrough',
        'durationchange',
        'play',
        'pause',
        'suspend',
        'emptied',
        'stalled',
        'error',
        'abort'
    ];
    events.forEach(event => {
        videoElement.addEventListener(event, () => {
        });
    });

    videoElement.addEventListener('error', () => {
    });

    return videoElement;
}
