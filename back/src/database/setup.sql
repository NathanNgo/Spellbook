-- Setup the database structure and tables


-- Create table for the d20pfsrd data.
CREATE TABLE IF NOT EXISTS d20pfsrd (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    school TEXT NOT NULL,
    subschool TEXT NOT NULL,
    descriptor TEXT NOT NULL,
    spell_level TEXT NOT NULL,
    casting_time TEXT NOT NULL,
    components TEXT NOT NULL,
    costly_components BOOLEAN NOT NULL CHECK (costly_components IN (0, 1)),
    range TEXT NOT NULL,
    area TEXT NOT NULL,
    effect TEXT NOT NULL,
    targets TEXT NOT NULL,
    duration TEXT NOT NULL,
    dismissible BOOLEAN NOT NULL CHECK (dismissible IN (0, 1)),
    shapeable BOOLEAN NOT NULL CHECK (shapeable IN (0, 1)),
    saving_throw TEXT NOT NULL,
    spell_resistance TEXT NOT NULL,
    description TEXT NOT NULL,
    description_formatted TEXT NOT NULL,
    source TEXT NOT NULL,
    full_text TEXT NOT NULL,
    verbal BOOLEAN NOT NULL CHECK (verbal IN (0, 1)),
    somatic BOOLEAN NOT NULL CHECK (somatic IN (0, 1)),
    material BOOLEAN NOT NULL CHECK (material IN (0, 1)),
    focus BOOLEAN NOT NULL CHECK (focus IN (0, 1)),
    divine_focus BOOLEAN NOT NULL CHECK (divine_focus IN (0, 1)),
    sor INTEGER,
    wiz INTEGER,
    cleric INTEGER,
    druid INTEGER,
    ranger INTEGER,
    bard INTEGER,
    paladin INTEGER,
    alchemist INTEGER,
    summoner INTEGER,
    witch INTEGER,
    inquisitor INTEGER,
    oracle INTEGER,
    antipaladin INTEGER,
    magus INTEGER,
    adept INTEGER,
    bloodrager INTEGER,
    shaman INTEGER,
    psychic INTEGER,
    medium INTEGER,
    mesmerist INTEGER,
    occultist INTEGER,
    spiritualist INTEGER,
    skald INTEGER,
    investigator INTEGER,
    hunter INTEGER,
    summoner_unchained INTEGER,
    deity TEXT NOT NULL,
    SLA_level INTEGER,
    domain TEXT NOT NULL,
    short_description TEXT NOT NULL,
    acid BOOLEAN NOT NULL CHECK (acid IN (0, 1)),
    chaotic BOOLEAN NOT NULL CHECK (chaotic IN (0, 1)),
    cold BOOLEAN NOT NULL CHECK (cold IN (0, 1)),
    curse BOOLEAN NOT NULL CHECK (curse IN (0, 1)),
    darkness BOOLEAN NOT NULL CHECK (darkness IN (0, 1)),
    death BOOLEAN NOT NULL CHECK (death IN (0, 1)),
    disease BOOLEAN NOT NULL CHECK (disease IN (0, 1)),
    earth BOOLEAN NOT NULL CHECK (earth IN (0, 1)),
    electricity BOOLEAN NOT NULL CHECK (electricity IN (0, 1)),
    emotion BOOLEAN NOT NULL CHECK (emotion IN (0, 1)),
    evil BOOLEAN NOT NULL CHECK (evil IN (0, 1)),
    fear BOOLEAN NOT NULL CHECK (fear IN (0, 1)),
    fire BOOLEAN NOT NULL CHECK (fire IN (0, 1)),
    force BOOLEAN NOT NULL CHECK (force IN (0, 1)),
    good BOOLEAN NOT NULL CHECK (good IN (0, 1)),
    language_dependent BOOLEAN NOT NULL CHECK (language_dependent IN (0, 1)),
    lawful BOOLEAN NOT NULL CHECK (lawful IN (0, 1)),
    light BOOLEAN NOT NULL CHECK (light IN (0, 1)),
    mind_affecting BOOLEAN NOT NULL CHECK (mind_affecting IN (0, 1)),
    pain BOOLEAN NOT NULL CHECK (pain IN (0, 1)),
    shadow BOOLEAN NOT NULL CHECK (shadow IN (0, 1)),
    sonic BOOLEAN NOT NULL CHECK (sonic IN (0, 1)),
    water BOOLEAN NOT NULL CHECK (water IN (0, 1)),
    ruse BOOLEAN NOT NULL CHECK (ruse IN (0, 1)),
    draconic BOOLEAN NOT NULL CHECK (draconic IN (0, 1)),
    meditative BOOLEAN NOT NULL CHECK (meditative IN (0, 1)),
    mythic BOOLEAN NOT NULL CHECK (mythic IN (0, 1)),
    linktext TEXT NOT NULL,
    material_costs INTEGER,
    bloodline TEXT NOT NULL,
    patron TEXT NOT NULL,
    mythic_text TEXT NOT NULL,
    augmented TEXT NOT NULL,
    haunt_statistics TEXT NOT NULL
);