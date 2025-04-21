import { useEffect, useState } from "react";
import { client } from "../sanityClient"; //Importere Sanity-klienten

export default function LogEntry() {
  const [logs, setLogs] = useState([]); //State for å lagre arbeidsloggene

  useEffect(() => {
    const logQuery = `*[_type == "logg"]{
      dato,
      navn,
      beskrivelse
    }`;

    //GROQ forspørsel for å hente alle dokumenter av typen "logg"
    const fetchLogs = async () => {
      const data = await client.fetch(logQuery);
      setLogs(data); //Oppdaterer state med hentede logger
    };

    fetchLogs(); //Kjører funksjonen en gang når komponenten lastes
  }, []);

  return (
    <section>
      <h2>Arbeidslogg</h2>
      <ul>
        {logs.length === 0 ? ( //Hvis det ikke er noen logger, viser <p>
          <p>Ingen loggdata tilgjengelig</p>
        ) : (
          logs.map((log) => (
            <li key={log.dato}>
              <strong>{log.navn}</strong> - {log.dato}: {log.beskrivelse}
            </li> //Viser navn, date og beskrivelse for hver loggføring
          ))
        )}
      </ul>
    </section>
  );
}
