import React, { useEffect, useState } from "react"; //Importerer useEffect og useState fra React 
import { Link } from "react-router-dom"; //Importere Link fra react-router-dom
import { client } from "../sanityClient"; //Importere Sanity-klienten

export default function Home() {
  const [members, setMembers] = useState([]); //Lager en state-variabel: "members" for å lagre data om team-medlemmer

  useEffect(() => { //useEffekt kjører en gang når komponenten kjøres første gang
    //GROQ-forespørsel for å hente teamMember fra Sanity 
    const query = `*[_type == "teamMember"]{
      name,
      email,
      image {
        asset -> {
          url
        }
      },
      slug //Vi henter slug for å lage en rute til hver profil
    }`;

    const fetchMembers = async () => {
      const data = await client.fetch(query); //Kjører GROQ-forspørselet 
      setMembers(data); //Oppdaterer state 
    };

    fetchMembers(); //Kjører funksjonen
  }, []); //Tom Array

  return (
    <main>
      <h2>Gruppe medlemmer</h2>
      <section id="groupmembers">
        {members.length === 0 ? (
          <p>Laster...</p>
        ) : (
          members.map((member) => ( //.Map leser gjennom alle medlemmer og lager en artikkel fo rhver
            <article key={member.name}>
              {/*Link til hver individuell medlem, sin egen side basert på slug*/}
              <Link to={`/team/${member.slug.current}`}>
              {/*Viser bilde til hvert medlem (eller et standardbilde hvis det mangler)*/}
                <img
                  src={member.image?.asset?.url || "path/to/default.jpg"}
                  alt={member.name}
                />
                {/*Viser navn og e-post*/}
                <p>{member.name}</p>
                <p>{member.email}</p>
              </Link>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
