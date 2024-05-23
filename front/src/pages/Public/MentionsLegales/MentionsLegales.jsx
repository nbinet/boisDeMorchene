import React from 'react';

const MentionsLegales = () => {
    return (
        <div className='bg-white'>
            <h1 className='text-center font-light style_h1'>Mentions légales</h1>

            <section className='mx-auto w-full md:w-5 my-8'>

                <div>

                    <div>
                        <h3>1. L'élevage.</h3>
                        <p>
                            Entrepreneur Individuel DU BOIS DE MORCHENE
                            <br />
                            <span>Gérante : </span> Mme Yasmine Robidou
                            <br />
                            <span>Date de création : </span> 1er août 1994
                            <br />
                            <span>SIRET : </span> 39804564100022
                            <br />
                            <span>N° de TVA Intracommunautaire : </span> FR05398045641
                        </p>
                    </div>
                    <div>
                        <h3>2. Adresse de l'élevage</h3>
                        <p>La Bruyère, 14700 Saint-Martin-de-Mieux, France</p>
                    </div>
                    <div>
                        <h3>3. Contact.</h3>
                        <p>
                            <span>Téléphone : </span>06.74.45.69.81
                            <br />
                            <span>Mail : </span><a href="mailto:yasmine.robidou@orange.fr">yasmine.robidou@orange.fr</a>
                        </p>
                    </div>

                </div>
                
            </section>
        </div>
    );
}

export default MentionsLegales;
