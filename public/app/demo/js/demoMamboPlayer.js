function demoHtml5player(parentTag) {
    "use strict";

    const ipfs = g_mamboObjMgr.get("ipfs");

    let m_videoPlayer;
    let m_playerTag;

    installButtonGroup();
    videoPlayer();

    /* For reference
        Video Type      Extension	MIME Type
        Flash           .flv	    video/x-flv
        MPEG-4          .mp4	    video/mp4
        iPhone Index	.m3u8	    application/x-mpegURL
        iPhone Segment	.ts	        video/MP2T
        3GP Mobile      .3gp	    video/3gpp
        QuickTime	    .mov	    video/quicktime
        A/V Interleave	.avi	    video/x-msvideo
        Windows Media	.wmv	    video/x-ms-wmv
    */

    function setupHls() {

        Hls.DefaultConfig.loader = HlsjsIpfsLoader;
        Hls.DefaultConfig.debug = false;
        const isSup = Hls.isSupported();
        if (isSup) {
            const hls = new Hls();
            hls.config.ipfs = ipfs;
            hls.config.ipfsHash = 'QmdpAidwAsBGptFB3b6A9Pyi5coEbgjHrL3K2Qrsutmj9K';
            hls.loadSource('master.m3u8');
            hls.attachMedia(m_playerTag);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                m_playerTag.play();
            });
        }
    }

    function setupMediaSource() {
        const parser = new m3u8Parser.Parser();
        const ms = new MediaSource();
        m_playerTag.src = window.URL.createObjectURL(ms);
        ms.addEventListener('sourceopen', msReady);

        async function msReady(event) {
            // Get the m3u8 playlist and parse it
            for await (const chunk of ipfs.get("QmdccEyrTxfvMiKAkQYBs9h8XDyZ6Hw8JJjRGGpVmyyZjF")) {
                parser.push(chunk);
                parser.end();
            }
            // Declare video SourceBuffer
            const sourceBuffer = ms.addSourceBuffer('video/MP2T; avc1.42c00d,mp4a.40.2');
            // Parse m3u8 manifest
            const videoSegments = parser.manifest.segments;
            // Iterate through manifest
            for (let i = 0; i < videoSegments.length; i++) {
                const segmentPath = `bafybeihf5pvm3gckha5zkcmiovc6hwhzvws3ffdfpswr2e2qtd2h57j3li/${videoSegments[i].name}`;
                for await (const chunk of ipfs.get(segmentPath)) {
                    sourceBuffer.appendBuffer(chunk);
                }
            }

        }
    }

    function videoPlayer() {
        const html = `
        <div style="display: flex;padding: 1em;box-sizing: border-box">
            <div id="demo-video" style="width: 50%;padding: 1em;"><h3>Video Player</h3></div>
            <div id="demo-audio" style="width: 50%;padding: 1em;"><h3>Audio Player</h3></div>
        </div>`;
        domJS.append(parentTag, html);

        const config = {
            player: {
                attr: {
                    src: "public/app/demo/media/video1.mp4",
                    type: "video/mp4"
                },
            }
        };

        m_videoPlayer = new MamboVideoPlayer("#demo-video", config);
        m_playerTag = m_videoPlayer.getPlayer().getTag();
    }


    function installButtonGroup() {

        let btnGroupProps = {
            buttons: [{
                id: 1,
                text: "Local MP4 Video"
            }, {
                id: 2,
                text: "IPFS HLS"
            }, {
                id: 3,
                text: "IPFS HLS MediaSource",
            }, {
                id: 4,
                text: "IPFS MP4 Video"
            }],
            fnClick: (context) => {
                const buttonId = context.button.getId();
                switch (buttonId) {
                    case 1:
                        m_playerTag.src = "public/app/demo/media/video1.mp4";
                        m_playerTag.type = "video/mp4";
                        break;
                    case 2:
                        setupHls();
                        break;
                    case 3:
                        setupMediaSource();
                        break;
                    case 4:
                        m_playerTag.src = "https://ipfs.io/ipfs/QmX8ULWunstJdPG2QfxpcG9B8oTxBUMiZoZ6GjyT2mq7An?filename=video3.mp4";
                        m_playerTag.type = "video/mp4";
                        break;
                }
            }
        };

        new MamboButtonGroup(parentTag, btnGroupProps);
    }
}
