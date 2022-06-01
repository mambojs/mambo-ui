if (location.host === `localhost:8002`) {
    (() => new EventSource(`http://localhost:8010`).onmessage = () => location.reload())();
}
