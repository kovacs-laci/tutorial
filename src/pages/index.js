import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home() {
    return (
        <Layout title="Főoldal">
            <div style={{padding: '2rem', maxWidth: '900px', margin: '0 auto'}}>
                <h1>Üdvözöllek a Webfejlesztés tananyagok oldalon</h1>

                <p style={{fontSize: '1.2rem'}}>
                    Ez a portál lépésről lépésre vezet végig a modern webfejlesztés alapjain:
                    verziókövetés, backend fejlesztés, adatbázisok, keretrendszerek, API‑k és API kliensek.
                    A cél, hogy gyakorlati példákon keresztül magabiztos tudást szerezz.
                </p>

                <hr style={{margin: '2rem 0'}} />

                <h2>Mit találsz itt?</h2>
                <ul style={{lineHeight: '1.8'}}>
                    <li>
                        <strong>Git</strong> – verziókövetés, csapatmunka, open source workflow-k.
                    </li>
                    <li>
                        <strong>PHP</strong> – nyelvi alapok, backend fejlesztési minták.
                    </li>
                    <li>
                        <strong>MySQL</strong> – adatbázisok, lekérdezések, kapcsolatok, optimalizálás.
                    </li>
                    <li>
                        <strong>Laravel</strong> – a legnépszerűbb PHP keretrendszer teljes workflow-ja.
                    </li>
                    <li>
                        <strong>REST API</strong> – API-k készítése és kliensek fejlesztése.
                    </li>
                    <li>
                        <strong>Stripe</strong> – online fizetés integrálása Laravelben.
                    </li>
                </ul>

                <hr style={{margin: '2rem 0'}} />

                <h2>Kiemelt kezdőpontok</h2>
                <p>Válassz egy témát, és már indulhat is a tanulás:</p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginTop: '1rem'
                }}>
                    <Link className="button button--secondary" to="/docs/git-gyorstalpalo">
                        Git gyorstalpaló
                    </Link>

                    <Link className="button button--secondary" to="/docs/sql-ismerteto">
                        SQL ismertető
                    </Link>

                    <Link className="button button--secondary" to="/docs/PHP/intro">
                        PHP alapok
                    </Link>

                    <Link className="button button--secondary" to="/docs/laravel/why-laravel">
                        Miért Laravel?
                    </Link>

                    <Link className="button button--secondary" to="/docs/rest-api/intro">
                        REST API
                    </Link>

                    <Link className="button button--secondary" to="/docs/rest-api-client/intro">
                        REST API kliensek
                    </Link>

                    <Link className="button button--secondary" to="/docs/stripe">
                        Stripe
                    </Link>
                </div>

                <hr style={{margin: '2rem 0'}} />

                <h2>Hogyan érdemes haladni?</h2>
                <p>
                    A tananyag logikus sorrendben épül fel. Ha most kezded:
                </p>
                <ol style={{lineHeight: '1.8'}}>
                    <li>Kezdd a <strong>Git</strong> alapokkal.</li>
                    <li>Tanuld meg az <strong>MySQL</strong> adatbázis-kezelést.</li>
                    <li>Folytasd a <strong>PHP</strong> nyelvi alapokkal.</li>
                    <li>Lépj tovább a <strong>Laravel</strong> keretrendszerre.</li>
                    <li>Építs teljes <strong>REST API</strong> alkalmazásokat.</li>
                    <li>Írj <strong>kliens</strong> alkalmazásokat REST API-hoz.</li>
                    <li><strong>Stripe</strong> segítségével add hozzá az online fizetési lehetőséget a Laravel webalkalmazásodhoz.</li>
                </ol>

                <p style={{marginTop: '2rem'}}>
                    Jó tanulást és sok sikerélményt a fejlesztésben!<br />
                    <br />Happy coding! 🙃
                </p>
            </div>
        </Layout>
);
}
