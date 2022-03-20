function demoEventManager() {

    const m_events = g_eventManager;
    const m_eventDirectory = g_eventDir;
    const m_eventNames = m_eventDirectory.events;


    // Valid
    m_events.addEventListener("demoListener", m_eventNames.testEvent, (data) => {
        console.table(data);
    });

    // Duplicate
    m_events.addEventListener("demoListener", m_eventNames.testEvent, (data) => {
        console.table(data);
    });

    // Invalid
    m_events.addEventListener("eventNotExist", "eventNotExist", (data) => {
        console.table(data);
    });

    // Fire the event
    m_events.fireEvent(m_eventNames.testEvent, { name: "Scotti" });

    // Delete the event listener
    m_events.removeEventListener("demoListener", m_eventNames.testEvent);
}
