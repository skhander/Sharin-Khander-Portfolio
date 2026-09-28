(() => {
  const STORAGE_KEY = "dreamcatcher-prototype-v1";

  const EMOTIONS = [
    { id: "longing", name: "Longing", prompt: "a sense of reaching for something distant", color: "#a68ce0", icon: "♡" },
    { id: "grief", name: "Grief", prompt: "weight or loss carried quietly", color: "#6b80b8", icon: "☂" },
    { id: "freedom", name: "Freedom", prompt: "openness, release, or flight", color: "#6bc7d1", icon: "✶" },
    { id: "transition", name: "Transition", prompt: "thresholds and in-between spaces", color: "#b39ed1", icon: "⇄" },
    { id: "avoidance", name: "Avoidance", prompt: "something kept at a distance", color: "#616194", icon: "◌" },
    { id: "desire", name: "Desire", prompt: "pull toward what you want", color: "#eb8c94", icon: "✦" },
    { id: "shame", name: "Shame", prompt: "exposure or hiding", color: "#856685", icon: "·" },
    { id: "wonder", name: "Wonder", prompt: "curiosity and the unknown", color: "#8cb8fa", icon: "★" },
    { id: "peace", name: "Peace", prompt: "stillness that stayed with you", color: "#7ab8ad", icon: "❧" },
    { id: "fear", name: "Fear", prompt: "unease that lingered after waking", color: "#73669e", icon: "!" }
  ];

  const LOCATION_WORDS = ["airport", "train", "station", "house", "home", "school", "hotel", "room", "forest", "ocean", "beach", "city", "road", "bridge", "hospital", "church", "garden", "elevator", "stairs"];
  const PEOPLE_WORDS = ["mother", "mom", "father", "dad", "child", "friend", "stranger", "teacher", "brother", "sister", "partner", "baby"];
  const SYMBOL_WORDS = ["bird", "dog", "cat", "water", "fire", "moon", "mirror", "door", "snake", "wolf", "flight", "car", "boat", "tree", "rain", "snow"];
  const HOT_WORDS = new Set([...LOCATION_WORDS, ...PEOPLE_WORDS, ...SYMBOL_WORDS]);

  const LOCATION_PHRASE = {
    airport: "an airport that felt suspended in time",
    train: "a train station between departures",
    station: "a train station between departures",
    ocean: "a vast shoreline",
    beach: "a vast shoreline",
    forest: "a forest thick with shadow and light",
    hotel: "a hotel room that didn't quite feel like yours",
    elevator: "an elevator moving between floors you couldn't name",
    school: "a school from an earlier chapter of life"
  };

  const SPOKEN_DREAMS = [
    [
      "Okay wait",
      "I was on a train…",
      "no, a station.",
      "It was late.",
      "My mom was there",
      "but she was younger,",
      "like when I was a kid.",
      "There were red birds.",
      "I think I missed the train.",
      "I kept looking at the board",
      "but I couldn't read it."
    ],
    [
      "Um…",
      "there was this old house.",
      "My house, I think.",
      "And a purple ocean",
      "right outside the door.",
      "My childhood dog was running",
      "along the shore",
      "and I couldn't catch up."
    ],
    [
      "I was in an elevator",
      "going up",
      "and I couldn't find my floor.",
      "I kept pressing buttons.",
      "Nothing happened.",
      "There was a stranger watching me."
    ],
    [
      "There was a forest path…",
      "and a mirror on a tree.",
      "My reflection was different.",
      "Older, maybe.",
      "Or just… not me.",
      "I remember rain on the leaves."
    ]
  ];

  function daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    d.setHours(7, 12, 0, 0);
    return d.toISOString();
  }

  function seedDreams() {
    return [
      enrich({
        id: "seed-1",
        createdAt: daysAgo(3),
        rawTranscript: "airport… missed flight… mom younger… red birds",
        emotions: ["transition", "longing"],
        colors: ["Red", "Blue"]
      }),
      enrich({
        id: "seed-2",
        createdAt: daysAgo(9),
        rawTranscript: "old house… purple ocean… childhood dog running",
        emotions: ["wonder", "peace"],
        colors: ["Purple", "Blue"]
      }),
      enrich({
        id: "seed-3",
        createdAt: daysAgo(16),
        rawTranscript: "elevator going up… couldn't find the floor… stranger watching",
        emotions: ["fear", "transition"],
        colors: ["Silver", "Black"]
      }),
      enrich({
        id: "seed-4",
        createdAt: daysAgo(24),
        rawTranscript: "train station at night… waiting… felt lonely but peaceful",
        emotions: ["peace", "longing"],
        colors: ["Blue", "Gold"]
      }),
      enrich({
        id: "seed-5",
        createdAt: daysAgo(38),
        rawTranscript: "forest path… mirror on a tree… my reflection was different",
        emotions: ["wonder", "desire"],
        colors: ["Green", "Silver"]
      })
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function emotionById(id) {
    return EMOTIONS.find((e) => e.id === id);
  }

  function words(text) {
    return (text || "").toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  }

  function extract(input, dream) {
    const lower = input.toLowerCase();
    const tokens = words(input);
    const symbols = new Set();
    const locations = new Set();
    const people = new Set();
    tokens.forEach((w) => {
      if (LOCATION_WORDS.includes(w)) locations.add(w);
      if (PEOPLE_WORDS.includes(w)) people.add(w);
      if (SYMBOL_WORDS.includes(w)) symbols.add(w);
    });
    locations.forEach((l) => symbols.add(l));

    const themes = [];
    if (/miss|late|lost/.test(lower)) themes.push("separation");
    if (/fly|float|free/.test(lower)) themes.push("freedom");
    if (/chase|run|follow/.test(lower)) themes.push("pursuit");
    if (/water|ocean|rain/.test(lower)) themes.push("water imagery");
    if (/travel|journey|airport|train/.test(lower)) themes.push("travel");

    let inferred = dream.emotions[0] ? emotionById(dream.emotions[0]) : null;
    if (!inferred) {
      if (/peace|calm/.test(lower)) inferred = emotionById("peace");
      else if (/fear|scared/.test(lower)) inferred = emotionById("fear");
      else if (/long|miss/.test(lower)) inferred = emotionById("longing");
      else if (/wonder|beautiful/.test(lower)) inferred = emotionById("wonder");
      else if (themes.includes("travel")) inferred = emotionById("transition");
    }

    return { symbols: [...symbols], locations: [...locations], people: [...people], inferred, themes };
  }

  function reconstructNarrative(input, extracted) {
    if (!input.trim()) {
      return "A dream remembered in pieces. Impressions stayed after waking, even if the story didn't.";
    }
    const sentences = [];
    if (extracted.locations[0]) {
      const loc = extracted.locations[0];
      sentences.push(`You were in ${LOCATION_PHRASE[loc] || `a ${loc} that felt both familiar and strange`}.`);
    } else if (extracted.themes.length) {
      sentences.push(`The dream moved through ${extracted.themes.join(" and ")}.`);
    } else {
      sentences.push("The dream came in pieces — images and feelings more than a clear story.");
    }
    if (extracted.people[0]) sentences.push(`${extracted.people[0][0].toUpperCase()}${extracted.people[0].slice(1)} showed up.`);
    if (extracted.symbols.includes("bird") || input.toLowerCase().includes("bird")) sentences.push("Birds kept appearing.");
    if (extracted.themes.includes("water imagery")) sentences.push("Water was somewhere in it.");
    if (extracted.themes.includes("separation")) sentences.push("There was a sense of something missed or left behind.");
    if (extracted.themes.includes("pursuit")) sentences.push("Something was moving — chasing, or being moved toward.");
    if (extracted.inferred) sentences.push(`What stayed strongest was ${extracted.inferred.prompt}.`);
    if (sentences.length < 2) {
      const bits = input.split(/[.,…]/).map((s) => s.trim()).filter(Boolean);
      if (bits.length > 1) sentences.push(`Pieces you mentioned: ${bits.slice(0, 4).join(", ")}.`);
    }
    return sentences.join(" ");
  }

  function enrich(dream, allDreams = []) {
    const input = [dream.rawTranscript, ...(dream.emotions || []), ...(dream.colors || [])].join(". ");
    const extracted = extract(input, dream);
    const emotion = extracted.inferred || emotionById(dream.emotions[0]);

    return {
      ...dream,
      dominantEmotion: emotion ? emotion.id : dream.emotions[0] || null,
      symbols: extracted.symbols,
      locations: extracted.locations,
      people: extracted.people,
      reconstructedNarrative: reconstructNarrative(input, extracted),
      lifeEventNote: dream.lifeEventNote || null,
      userReflection: dream.userReflection || ""
    };
  }

  function snippet(text) {
    const cleaned = (text || "")
      .replace(/…/g, ",")
      .replace(/\s+,/g, ",")
      .replace(/,\s*/g, ", ")
      .replace(/^,\s*|\s*,$/g, "")
      .trim();
    const wordsList = cleaned.split(/\s+/).filter(Boolean);
    if (!wordsList.length) return "Untitled dream";
    return wordsList.slice(0, 16).join(" ") + (wordsList.length > 16 ? "…" : "");
  }

  function monthHeading(iso) {
    return new Date(iso).toLocaleDateString(undefined, { month: "long", year: "numeric" }).toUpperCase();
  }

  function dayNumber(iso) {
    return String(new Date(iso).getDate());
  }

  function weekdayName(iso) {
    return new Date(iso).toLocaleDateString(undefined, { weekday: "long" });
  }

  function groupDreamsByMonth(dreams) {
    const groups = [];
    dreams.forEach((dream) => {
      const label = monthHeading(dream.createdAt);
      const last = groups[groups.length - 1];
      if (!last || last.label !== label) groups.push({ label, dreams: [dream] });
      else last.dreams.push(dream);
    });
    return groups;
  }

  function displayKeyword(key) {
    if (key === "mom") return "Mother";
    if (key === "dad") return "Father";
    return key.charAt(0).toUpperCase() + key.slice(1);
  }

  function formatShort(iso) {
    return new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  }

  function formatLatest(iso) {
    const d = new Date(iso);
    const day = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    const time = d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
    return `${day} · ${time}`;
  }

  function latestRead(dream) {
    const emotions = (dream.emotions || []).map((id) => emotionById(id)).filter(Boolean);
    const lead = emotionById(dream.dominantEmotion) || emotions[0];
    const travel = (dream.symbols || []).some((s) =>
      ["airport", "train", "flight", "station", "road", "elevator"].includes(s)
    ) || (dream.emotions || []).includes("transition");
    const about = [];
    if (travel) about.push("movement");
    if (lead && ["fear", "transition"].includes(lead.id)) about.push("uncertainty");
    else if (lead) about.push(lead.name.toLowerCase());
    if (about.length === 1 && travel) about.push("uncertainty");
    if (!about.length) about.push("what stayed after waking");
    const title = about.length === 1
      ? `A dream about ${about[0]}.`
      : `A dream about ${about[0]} and ${about[1]}.`;
    let body = "A feeling stayed after the images faded. That's the part worth keeping.";
    if (travel) body = "You were trying to get somewhere, but kept encountering delays and unfamiliar places.";
    else if (lead?.id === "wonder") body = "Something familiar had changed shape, and you were trying to understand what it had become.";
    else if (lead?.id === "fear") body = "You were moving without a floor you could name, watched by someone you didn't know.";
    else if (lead?.id === "peace") body = "You were waiting in a quiet place — alone, but not entirely unheld.";
    const tags = [];
    if (emotions.some((e) => e.id === "longing")) tags.push("Longing");
    else if (lead) tags.push(lead.name);
    if (travel) tags.push("Movement");
    if (travel || lead?.id === "fear") tags.push("Uncertainty");
    if (lead && !tags.includes(lead.name) && tags.length < 3) tags.push(lead.name);
    return { title, body, tags: tags.slice(0, 3) };
  }

  function formatLong(iso) {
    return new Date(iso).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  }

  function formatDateOnly(iso) {
    return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  function monthName() {
    return new Date().toLocaleDateString(undefined, { month: "long" });
  }

  function greeting() {
    const hour = new Date().getHours();
    const name = "Sharin";
    if (hour < 12) return `Good morning, ${name}.`;
    if (hour < 17) return `Good afternoon, ${name}.`;
    return `Good evening, ${name}.`;
  }

  function clamp(text, n) {
    const t = (text || "").trim();
    return t.length > n ? `${t.slice(0, n)}…` : t;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function defaultState() {
    return {
      screen: "home",
      tab: "home",
      dreams: seedDreams(),
      currentId: null,
      capture: {
        recording: false,
        finished: false,
        transcript: "",
        startedAt: null,
        elapsed: 0,
        interim: ""
      },
      speechScriptIndex: 0,
      story: { showLife: true, lifeDone: false, chip: null },
      detailLayer: "emotional",
      dreamOpen: false,
      reflect: { messages: [], input: "" },
      timelineQuery: "",
      timelineSort: "newest"
    };
  }

  let state = loadState();
  let timer = null;
  let savedTimer = null;
  let dictationTimer = null;

  function loadState() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return { ...defaultState(), ...parsed, capture: { ...defaultState().capture, ...(parsed.capture || {}), recording: false, interim: "" } };
    } catch {
      return defaultState();
    }
  }

  function persist() {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function go(screen, extra = {}) {
    state = { ...state, screen, ...extra };
    persist();
    render();
  }

  function currentDream() {
    return state.dreams.find((d) => d.id === state.currentId);
  }

  function dreamMatchesQuery(dream, query) {
    if (!query) return true;
    const haystack = [
      dream.rawTranscript,
      dream.reconstructedNarrative,
      dream.lifeEventNote,
      ...(dream.symbols || []).flatMap((s) => [s, displayKeyword(s)]),
      ...(dream.emotions || []).flatMap((id) => [id, emotionById(id)?.name]),
      ...(dream.colors || [])
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  }

  function visibleTimelineDreams() {
    const query = state.timelineQuery.trim().toLowerCase();
    const list = state.dreams.filter((dream) => dreamMatchesQuery(dream, query));
    list.sort((a, b) => {
      const delta = new Date(a.createdAt) - new Date(b.createdAt);
      return state.timelineSort === "oldest" ? delta : -delta;
    });
    return list;
  }

  function lifePrompt(dream) {
    const emotion = emotionById(dream.dominantEmotion);
    const hasWater = dream.symbols.some((s) => ["water", "ocean", "rain", "beach"].includes(s));
    const hasTravel = dream.symbols.some((s) => ["airport", "train", "flight", "station", "road"].includes(s));
    if (hasWater) {
      return { mirror: "Water showed up in this dream", question: "Does water connect to anything emotional in your life right now?", chips: ["Yes, a bit", "Not really", "Family", "Faith", "Skip"] };
    }
    if (hasTravel || emotion?.id === "transition") {
      return { mirror: "There was a lot of movement in this dream", question: "Is something changing in your life?", chips: ["Career", "Move", "Relationship", "Faith", "Skip"] };
    }
    if (["fear", "shame", "avoidance"].includes(emotion?.id)) {
      return { mirror: "Something in this dream felt uneasy", question: "What's been stressing you out lately?", chips: ["Work", "Family", "Health", "Money", "Skip"] };
    }
    if (["longing", "grief"].includes(emotion?.id)) {
      return { mirror: "There was a sense of loss or reaching in this dream", question: "Has someone or something been on your mind?", chips: ["A person", "A place", "The past", "Faith", "Skip"] };
    }
    if (emotion?.id === "desire") {
      return { mirror: "This dream had a pull toward something", question: "What do you find yourself wanting lately?", chips: ["Connection", "Change", "Rest", "Clarity", "Skip"] };
    }
    if (["peace", "wonder", "freedom"].includes(emotion?.id)) {
      return { mirror: "It left some stillness or wonder after waking", question: "What's been bringing you peace lately?", chips: ["Faith", "People", "Nature", "Work", "Skip"] };
    }
    return { mirror: "This one left an impression", question: "Does anything in your life feel connected to this?", chips: ["Work", "Family", "Health", "Faith", "Skip"] };
  }

  function sleepSparkline(scores) {
    const width = 320;
    const height = 64;
    const min = Math.min(...scores) - 6;
    const max = Math.max(...scores) + 2;
    const points = scores.map((value, i) => {
      const x = (i / (scores.length - 1)) * width;
      const y = height - ((value - min) / (max - min)) * (height - 8) - 4;
      return [x, y];
    });
    const line = points.map((point, i) => `${i ? "L" : "M"}${point[0].toFixed(1)},${point[1].toFixed(1)}`).join(" ");
    const area = `${line} L${width},${height} L0,${height} Z`;
    const last = points[points.length - 1];
    return `
      <svg class="sleep-line" viewBox="0 0 ${width} ${height}" role="img" aria-label="Oura sleep scores over the last 14 days">
        <defs>
          <linearGradient id="sleepGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(140,102,209,0.34)" />
            <stop offset="100%" stop-color="rgba(140,102,209,0)" />
          </linearGradient>
        </defs>
        <path d="${area}" fill="url(#sleepGlow)"></path>
        <path d="${line}" fill="none" stroke="rgba(196,192,239,0.92)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
        <circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="3.2" fill="#c4c0ef"></circle>
      </svg>
    `;
  }

  function patternsLens(dreams) {
    const scores = [84, 86, 83, 88, 81, 85, 80, 78, 74, 71, 76, 68, 70, 72];
    const avg = (list) => Math.round(list.reduce((sum, value) => sum + value, 0) / list.length);
    const weekAvg = avg(scores.slice(-7));
    const prevAvg = avg(scores.slice(0, 7));
    const travelCount = dreams.filter((d) =>
      d.emotions.includes("transition") ||
      d.symbols.some((s) => ["airport", "train", "flight", "station", "road", "elevator"].includes(s))
    ).length;
    const lateMessages = 14;
    const hasDreams = dreams.length > 0;
    return {
      scores,
      weekAvg,
      prevAvg,
      delta: weekAvg - prevAvg,
      travelCount,
      lateMessages,
      reading: hasDreams
        ? "You're carrying an unfinished decision. Sleep has been slipping, Slack has been asking you to stay available, and your dreams keep putting you in terminals."
        : "Sleep has been slipping and a few threads are still asking you to choose. Record a night and this screen will start connecting that to what returns in your dreams.",
      sleepNote: "The nights you answered Slack after 10, your Oura score fell the next morning.",
      waking: [
        { source: "Inbox", when: "2 days", text: "The offer timeline is still sitting unanswered." },
        { source: "Slack", when: "last night", text: "You were the last one in #launch after 11." }
      ],
      cope: [
        {
          title: "Leave the last hour of the night alone.",
          detail: "One thread can wait until morning. Your sleep score has been tracking those replies."
        },
        {
          title: "Write the decision in one sentence before bed.",
          detail: "Airports keep appearing when a choice is being postponed, not when a trip is coming."
        }
      ]
    };
  }

  function generateInsights(dreams) {
    const insights = [];
    const symbolCounts = {};
    dreams.forEach((d) => d.symbols.forEach((s) => { symbolCounts[s] = (symbolCounts[s] || 0) + 1; }));
    const topSymbol = Object.entries(symbolCounts).sort((a, b) => b[1] - a[1])[0];
    if (topSymbol && topSymbol[1] >= 2) {
      insights.push({ title: `Recurring symbol: ${topSymbol[0]}`, detail: `${topSymbol[0]} has shown up ${topSymbol[1]} times in your dreams. Its meaning is personal — notice what's going on in your life when it appears.` });
    }
    const emotionCounts = {};
    dreams.forEach((d) => { if (d.dominantEmotion) emotionCounts[d.dominantEmotion] = (emotionCounts[d.dominantEmotion] || 0) + 1; });
    const topEmotion = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0];
    if (topEmotion && topEmotion[1] >= 2) {
      const em = emotionById(topEmotion[0]);
      insights.push({ title: `Common feeling: ${em.name}`, detail: `${topEmotion[1]} of your dreams felt ${em.name.toLowerCase()}. ${em.prompt[0].toUpperCase()}${em.prompt.slice(1)}.` });
    }
    const water = dreams.filter((d) => d.symbols.some((s) => ["water", "ocean", "rain", "beach"].includes(s)) || /water|ocean/.test(d.rawTranscript)).length;
    if (water >= 2) insights.push({ title: "Water", detail: `Water has come up in ${water} dreams. For you, it may track times of emotional intensity.` });
    const travel = dreams.filter((d) => d.emotions.includes("transition") || d.symbols.includes("airport") || d.symbols.includes("train")).length;
    if (travel >= 2) insights.push({ title: "Thresholds", detail: "Movement and passage have been showing up — your mind may be working through a change." });
    return insights;
  }

  function homeMirror(dreams) {
    const symbols = {};
    const emotions = {};
    dreams.forEach((d) => {
      (d.symbols || []).forEach((s) => { symbols[s] = (symbols[s] || 0) + 1; });
      (d.emotions || []).forEach((id) => { emotions[id] = (emotions[id] || 0) + 1; });
    });
    const topEmotions = Object.entries(emotions).sort((a, b) => b[1] - a[1]);
    const topSymbols = Object.entries(symbols).sort((a, b) => b[1] - a[1]);
    const travelCount = dreams.filter((d) =>
      d.emotions.includes("transition") ||
      d.symbols.some((s) => ["airport", "train", "flight", "station", "road", "elevator"].includes(s))
    ).length;
    const themes = [];
    topEmotions.forEach(([id, count]) => {
      const em = emotionById(id);
      if (em && count >= 2 && themes.length < 3) {
        themes.push({ id, name: em.name, icon: em.icon, count, query: em.name });
      }
    });
    if (travelCount >= 2 && !themes.some((t) => t.name === "Thresholds")) {
      themes.splice(Math.min(2, themes.length), 0, {
        id: "thresholds",
        name: "Thresholds",
        icon: "✧",
        count: travelCount,
        query: "airport"
      });
    }
    const uniqueThemeNames = [];
    themes.forEach((t) => {
      if (!uniqueThemeNames.find((x) => x.name === t.name)) uniqueThemeNames.push(t);
    });
    const lead = emotionById(topEmotions[0]?.[0]);
    const imageWords = topSymbols.slice(0, 3).map(([s]) => {
      const word = displayKeyword(s).toLowerCase();
      if (word.endsWith("s") || word === "flight") return word;
      return `${word}s`;
    });
    const imagePhrase = imageWords.length
      ? imageWords.length === 1 ? imageWords[0] : `${imageWords.slice(0, -1).join(", ")}, and ${imageWords[imageWords.length - 1]}`
      : "familiar places";
    const headline = lead
      ? `You're moving through a period of ${lead.name.toLowerCase()}.`
      : "Your dream life is just beginning.";
    const summary = lead
      ? `${headline} Across your recent dreams, ${imagePhrase} keep appearing.`
      : "Record a night and this screen will begin to show what returns — feelings, places, and images that keep following you.";
    return {
      headline,
      summary,
      paragraphs: [summary],
      themes: uniqueThemeNames.slice(0, 3),
      symbolCount: Object.keys(symbols).length,
      themeCount: uniqueThemeNames.slice(0, 3).length
    };
  }

  function monthStory(dreams) {
    const now = new Date();
    const monthDreams = dreams.filter((d) => {
      const dt = new Date(d.createdAt);
      return dt.getMonth() === now.getMonth() && dt.getFullYear() === now.getFullYear();
    });
    if (!monthDreams.length) return "No dreams this month yet. Record one to start your recap.";
    const emotionCounts = {};
    monthDreams.forEach((d) => { if (d.dominantEmotion) emotionCounts[d.dominantEmotion] = (emotionCounts[d.dominantEmotion] || 0) + 1; });
    const top = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0];
    const em = top ? emotionById(top[0]) : null;
    const symbolCounts = {};
    monthDreams.forEach((d) => d.symbols.forEach((s) => { symbolCounts[s] = (symbolCounts[s] || 0) + 1; }));
    const topSymbols = Object.entries(symbolCounts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([s]) => s);
    let story = `${monthName()} has been `;
    story += em ? `mostly ${em.name.toLowerCase()} — ${em.prompt}. ` : "quiet in your archive so far. ";
    if (topSymbols.length) story += `Recurring images: ${topSymbols.join(", ")}. `;
    story += "Check back next month and see what's shifted.";
    return story;
  }

  function reflectReply(text, dream) {
    const lower = text.toLowerCase();
    if (dream.lifeEventNote && /(yes|connected|related)/.test(lower)) {
      return `You mentioned ${dream.lifeEventNote}. This dream might be picking up on that. The link doesn't have to be exact to matter.`;
    }
    if (/(work|job|career)/.test(lower)) return "Sounds like something at work is on your mind. Dreams often carry the weight of things we haven't said out loud yet.";
    if (/(relationship|partner|love)/.test(lower)) return "Relationships sit deep. The people in your dream may not be literal — sometimes they stand in for parts of you wanting closeness, or distance.";
    if (/(afraid|scared|anxious)/.test(lower)) return "Fear in dreams rarely points to actual danger. More often it shows up around a change you're approaching or haven't fully processed.";
    if (/(yes|connected|related)/.test(lower)) return "That matters. You don't have to figure it all out tonight. Naming the link is usually a good start.";
    if (/(no|don't know|not sure)/.test(lower)) return "That's fine. Dreams don't always have a clear waking match. Sometimes the meaning shows up later, once patterns appear.";
    return "Thanks for sharing. Is there a specific image from the dream you want to sit with?";
  }

  function tabBar(active) {
    return `
      <nav class="nav" aria-label="Main">
        <button class="nav-item" data-go="home"${active === "home" ? ' aria-current="page"' : ""}><span class="ico" aria-hidden="true">☁</span>Home</button>
        <button class="nav-item" data-go="timeline"${active === "timeline" ? ' aria-current="page"' : ""}><span class="ico" aria-hidden="true">✦</span>Timeline</button>
        <button class="nav-item" data-go="patterns"${active === "patterns" ? ' aria-current="page"' : ""}><span class="ico" aria-hidden="true">◈</span>Patterns</button>
      </nav>
    `;
  }

  function pageHead(title) {
    return `
      <header class="page-head">
        <h1>${title}</h1>
        <button class="btn btn--ghost" data-action="reset">Reset</button>
      </header>
    `;
  }

  function renderHome() {
    const recent = state.dreams[0];
    const read = recent ? latestRead(recent) : null;
    const mirror = homeMirror(state.dreams);
    const lens = patternsLens(state.dreams);
    return `
      <section class="screen">
        <header class="page-head">
          <p class="brand">Dream Catcher</p>
          <button class="btn btn--ghost" data-action="reset">Reset</button>
        </header>
        <div class="scroll with-tabs home-scroll">
          <p class="greeting-line">${greeting()}</p>
          <button class="record-row" data-action="open-capture">
            <span class="record-ico" aria-hidden="true">🎙</span>
            <span class="record-title">Record a dream</span>
            <span class="record-hint">Tap to speak</span>
          </button>
          ${read ? `
            <section class="latest">
              <h2 class="section-label">Your latest dream</h2>
              <p class="latest-date">${escapeHtml(formatLatest(recent.createdAt))}</p>
              <p class="latest-title">${escapeHtml(read.title)}</p>
              <p class="latest-body">${escapeHtml(read.body)}</p>
              ${read.tags.length ? `<p class="latest-tags">${escapeHtml(read.tags.join(" · "))}</p>` : ""}
              <button class="btn btn--ghost recent-link" data-open-dream="${recent.id}">View dream →</button>
            </section>
          ` : `
            <p class="latest-empty">Record a night and this screen will hold a short read of it.</p>
          `}
          <button class="remember-prompt" data-action="open-capture">What do you remember most?</button>
          ${mirror.themes.length ? `
            <section class="theme-block">
              <h2 class="section-label">Recurring Themes</h2>
              ${mirror.themes.map((theme) => `
                <button class="theme-row" data-theme="${escapeHtml(theme.query)}">
                  <span class="theme-ico" aria-hidden="true">${theme.icon}</span>
                  <span>
                    <span class="theme-name">${escapeHtml(theme.name)}</span>
                    <span class="theme-count">${theme.count} ${theme.count === 1 ? "dream" : "dreams"}</span>
                  </span>
                </button>
              `).join("")}
            </section>
          ` : ""}
          <section class="week-block">
            <h2 class="section-label">This Week</h2>
            <p class="week-copy">${escapeHtml(lens.reading)}</p>
            <button class="btn btn--ghost recent-link" data-go="patterns">See this week →</button>
          </section>
        </div>
        ${tabBar("home")}
      </section>
    `;
  }

  function renderCapture() {
    const c = state.capture;
    const reviewing = !c.recording && c.finished;
    let prompt = `<h2>What do you remember about your dream?</h2><p class="secondary">One word is enough.</p>`;
    if (c.recording) {
      const m = String(Math.floor(c.elapsed / 60)).padStart(2, "0");
      const s = String(c.elapsed % 60).padStart(2, "0");
      prompt = `<h2>Listening…</h2><p class="timer"><span class="live-dot" aria-hidden="true"></span><span>${m}:${s}</span></p>`;
    } else if (reviewing) {
      const m = String(Math.floor(c.elapsed / 60)).padStart(2, "0");
      const s = String(c.elapsed % 60).padStart(2, "0");
      prompt = `<h2>Got it</h2><p class="secondary">${m}:${s} recorded</p>`;
    }

    const highlighted = reviewing && c.transcript
      ? `<div class="words">${c.transcript.split(/(\s+)/).map((part) => {
          const clean = part.toLowerCase().replace(/[^a-z0-9]/g, "");
          return /\s+/.test(part) ? escapeHtml(part) : `<span class="word ${HOT_WORDS.has(clean) ? "word--key" : ""}">${escapeHtml(part)}</span>`;
        }).join("")}</div>`
      : "";

    return `
      <section class="screen">
        <div class="topbar">
          <button class="btn btn--ghost" data-action="close-capture">Close</button>
          <span></span>
        </div>
        <div class="prompt">${prompt}</div>
        ${c.recording || reviewing || c.transcript ? `
          <div class="transcript" ${c.recording ? 'id="live-transcript" aria-live="polite"' : ""}>
            ${c.recording ? `${c.transcript || c.interim ? `${escapeHtml(c.transcript)}${c.interim ? `<span class="interim">${c.transcript ? " " : ""}${escapeHtml(c.interim)}</span>` : ""}` : `<span class="placeholder">Your words appear here…</span>`}<span class="caret" aria-hidden="true"></span>` : (c.transcript ? highlighted : `<p class="placeholder">No words heard. Tap the mic to try again.</p>`)}
          </div>
        ` : ""}
        ${reviewing ? "" : `<div class="spacer"></div>`}
        <div class="mic-dock${reviewing ? " mic-dock--review" : ""}">
          <button class="nebula ${c.recording ? "live" : ""}" data-action="toggle-mic" aria-label="${c.recording ? "Stop recording" : "Start recording"}">${c.recording ? "〰" : "🎙"}</button>
          ${!c.recording && !reviewing ? `<p class="mic-hint">Tap the mic and speak what you remember.</p>` : ""}
          ${c.recording ? `<p class="mic-hint">Tap the mic to stop.</p>` : ""}
        </div>
        ${c.transcript.trim() ? `<div class="actions${reviewing ? " actions--review" : ""}" style="padding-top:0"><button class="btn btn--primary" data-action="save-dream">Save</button></div>` : ""}
      </section>
    `;
  }

  function renderSaved() {
    const dream = currentDream();
    const preview = dream ? clamp(dream.rawTranscript, 60) : "";
    return `
      <section class="screen">
        <div class="center-state">
          <div class="big-icon" aria-hidden="true">☾</div>
          <p class="status">Saved</p>
          <h2 class="title">Dream saved</h2>
          ${preview ? `<p class="quote">“${escapeHtml(preview)}”</p>` : ""}
          <p class="secondary">It’s in your archive whenever you’re ready.</p>
        </div>
      </section>
    `;
  }

  function renderStory() {
    const dream = currentDream();
    if (!dream) return renderHome();
    const prompt = lifePrompt(dream);
    return `
      <section class="screen">
        <div class="scroll stack">
          <div class="story">
            <p class="field-label">Your story</p>
            <p class="body">${escapeHtml(dream.reconstructedNarrative)}</p>
            ${dream.symbols.length ? `<div class="symbol-row">${dream.symbols.slice(0, 5).map((s) => `<span class="badge">${escapeHtml(s)}</span>`).join("")}</div>` : ""}
          </div>
          ${state.story.showLife && !state.story.lifeDone ? `
            <div class="card">
              <p class="secondary">${escapeHtml(prompt.mirror)}</p>
              <h2 class="section-title" style="margin:8px 0 16px">${escapeHtml(prompt.question)}</h2>
              <div class="chips">
                ${prompt.chips.map((chip) => `
                  <button class="chip" data-life-chip="${escapeHtml(chip)}" aria-pressed="${state.story.chip === chip}">${escapeHtml(chip)}</button>
                `).join("")}
              </div>
            </div>
          ` : ""}
        </div>
        ${!state.story.showLife || state.story.lifeDone ? `
          <div class="actions">
            <button class="btn btn--primary" data-action="view-dream">View dream</button>
            <button class="btn btn--ghost" data-action="done-story">Done for now</button>
          </div>
        ` : `<div class="actions"><button class="btn btn--ghost" data-action="skip-life">Not now</button></div>`}
      </section>
    `;
  }

  function interpretationParagraphs(dream, layerId) {
    const emotion = emotionById(dream.dominantEmotion);
    const named = (dream.symbols || []).slice(0, 3).map(displayKeyword);
    const symbolPhrase = named.length
      ? named.length === 1 ? named[0].toLowerCase() : `${named.slice(0, -1).join(", ").toLowerCase()}, and ${named[named.length - 1].toLowerCase()}`
      : "these images";
    const feeling = emotion ? emotion.name.toLowerCase() : "unsettled";
    const hasMother = (dream.people || []).some((p) => ["mom", "mother"].includes(p));

    if (layerId === "jungian") {
      return [
        `The ${symbolPhrase} read as threshold images — the psyche standing between a life that is ending and one that has not been chosen yet.`,
        hasMother
          ? "A mother who appears younger often arrives as a guide-figure, not a literal visit. The question is which part of you she is trying to accompany across."
          : "Figures in the dream are less people than functions: a guide, a stranger, a part of you that will not move until something is named."
      ];
    }
    if (layerId === "christian") {
      return [
        `Journeys and unfinished departures often surface when a calling is felt but not yet answered. The ${symbolPhrase} can mark that already-and-not-yet stretch.`,
        "This is not a verdict. It is an invitation to notice what you are being asked to leave, and what care is still traveling with you."
      ];
    }
    if (layerId === "islamic") {
      return [
        `Travel in a dream is often read as a change of state, not only a change of place. The ${symbolPhrase} may be sitting next to a decision that has not been made in waking life.`,
        "A reading in this tradition would not force an answer tonight. It would ask you to notice the sign, then return to the choice with a quieter heart."
      ];
    }
    if (layerId === "jewish") {
      return [
        `Crossing and not-crossing is an old image — leaving, lingering, looking back. The ${symbolPhrase} keep you in the in-between, where a decision is still open.`,
        "The work is not to decode every symbol. It is to ask what you are still standing in the terminal to decide, and who you refuse to leave behind."
      ];
    }
    return [
      emotion
        ? `You may be moving through a period of ${feeling}, where something familiar is behind you but what's next hasn't fully taken shape.`
        : "Sit with what lingered after you woke up. That feeling usually says more than the plot.",
      `The ${symbolPhrase} point toward a tension between moving forward and holding onto what you've left behind. The feeling after waking is the part to stay with.`
    ];
  }

  function renderDetail() {
    const dream = currentDream();
    if (!dream) return renderHome();
    const layers = [
      { id: "emotional", label: "Emotional" },
      { id: "jungian", label: "Jungian" },
      { id: "christian", label: "Christian" },
      { id: "islamic", label: "Islamic" },
      { id: "jewish", label: "Jewish" }
    ];
    const active = layers.find((l) => l.id === state.detailLayer) || layers[0];
    const paragraphs = interpretationParagraphs(dream, active.id);
    return `
      <section class="screen">
        <div class="topbar">
          <button class="btn btn--ghost" data-action="back-detail">← Back</button>
          <p class="caption">${formatShort(dream.createdAt)}</p>
        </div>
        <div class="scroll reading-screen">
          <h2 class="section-label">Interpretation</h2>
          <div class="lens" role="tablist" aria-label="Interpretation">
            ${layers.map((l) => `<button class="lens-btn" role="tab" data-layer="${l.id}" aria-selected="${l.id === active.id}">${l.label}</button>`).join("")}
          </div>
          <div class="reading">
            <p class="reading-kicker">Your dream suggests...</p>
            ${paragraphs.map((p) => `<p class="reading-body">${escapeHtml(p)}</p>`).join("")}
          </div>
          <button class="dream-fold" data-action="toggle-dream" aria-expanded="${state.dreamOpen}">
            <span class="field-label">Your dream</span>
            <span class="caption">${state.dreamOpen ? "Hide" : "Tap to expand"}</span>
          </button>
          ${state.dreamOpen ? `<p class="dream-quote">“${escapeHtml(dream.reconstructedNarrative || dream.rawTranscript)}”</p>` : ""}
          ${dream.symbols.length ? `
            <div class="meta-block">
              <p class="meta-row"><span class="field-label">Symbols</span> ${escapeHtml(dream.symbols.map(displayKeyword).join(" · "))}</p>
            </div>
          ` : ""}
          ${dream.lifeEventNote ? `<p class="caption">Life link · ${escapeHtml(dream.lifeEventNote)}</p>` : ""}
          <label class="field" style="margin-top:32px">
            <span class="field-label">Your read</span>
            <textarea class="textarea" id="user-read" placeholder="What does it mean to you?">${escapeHtml(dream.userReflection || "")}</textarea>
          </label>
          <button class="btn btn--ghost" data-action="open-reflect" style="justify-content:flex-start;padding-left:0">Reflect</button>
        </div>
      </section>
    `;
  }

  function renderTimeline() {
    const dreams = visibleTimelineDreams();
    const query = state.timelineQuery.trim();
    const oldestFirst = state.timelineSort === "oldest";
    const groups = groupDreamsByMonth(dreams);
    return `
      <section class="screen">
        ${pageHead("Timeline")}
        <div class="scroll with-tabs">
          <label class="search search--quiet">
            <span class="search-ico" aria-hidden="true">⌕</span>
            <span class="visually-hidden">Search dreams</span>
            <input id="timeline-search" type="search" placeholder="Search dreams" value="${escapeHtml(state.timelineQuery)}" autocomplete="off" />
          </label>
          <button
            class="sort-line"
            data-sort="${oldestFirst ? "newest" : "oldest"}"
            aria-label="Change sort. Currently ${oldestFirst ? "oldest first" : "newest first"}"
          >Sort: ${oldestFirst ? "Oldest first" : "Newest first"}</button>
          ${groups.length ? groups.map((group) => `
            <section class="month-group">
              <h2 class="month-label">${escapeHtml(group.label)}</h2>
              ${group.dreams.map((dream) => {
                const emotion = emotionById(dream.dominantEmotion);
                const tags = [
                  emotion ? emotion.name : null,
                  ...dream.symbols.slice(0, 3).map(displayKeyword)
                ].filter((v, i, a) => v && a.indexOf(v) === i);
                return `
                  <button class="t-row" data-open-dream="${dream.id}">
                    <span class="t-date">
                      <span class="t-num">${dayNumber(dream.createdAt)}</span>
                      <span class="t-weekday">${weekdayName(dream.createdAt)}</span>
                    </span>
                    <span class="t-title">${escapeHtml(snippet(dream.rawTranscript))}</span>
                    ${tags.length ? `
                      <span class="t-meta">
                        ${emotion ? `<span class="t-emo" style="color:${emotion.color}" aria-hidden="true">${emotion.icon}</span>` : ""}
                        ${escapeHtml(tags.join(" · "))}
                      </span>
                    ` : ""}
                  </button>
                `;
              }).join("")}
            </section>
          `).join("") : `
            <div class="empty">
              <p>${query ? `No matches for “${escapeHtml(query)}”.` : "No dreams yet."}</p>
              ${query ? `<button class="btn btn--ghost" data-action="clear-search">Clear search</button>` : ""}
            </div>
          `}
        </div>
        ${tabBar("timeline")}
      </section>
    `;
  }

  function renderPatterns() {
    const lens = patternsLens(state.dreams);
    const deltaAbs = Math.abs(lens.delta);
    const deltaValue = lens.delta === 0 ? "0" : `${lens.delta > 0 ? "+" : "−"}${deltaAbs}`;
    return `
      <section class="screen">
        ${pageHead("Patterns")}
        <div class="scroll with-tabs patterns-scroll">
          <section class="pattern-hero">
            <p class="summary-star" aria-hidden="true">✦</p>
            <h2 class="section-label">This Week</h2>
            <p class="coming-body">${escapeHtml(lens.reading)}</p>
            <p class="summary-meta">${lens.weekAvg} sleep · ${lens.lateMessages} late messages · ${lens.travelCount} threshold ${lens.travelCount === 1 ? "dream" : "dreams"}</p>
          </section>
          <section class="pattern-block">
            <h2 class="section-label">Sleep</h2>
            ${sleepSparkline(lens.scores)}
            <div class="sleep-stats">
              <p class="sleep-stat"><strong>${lens.weekAvg}</strong><span>this week</span></p>
              <p class="sleep-stat"><strong>${deltaValue}</strong><span>vs last week</span></p>
            </div>
            <p class="pattern-note">${escapeHtml(lens.sleepNote)}</p>
          </section>
          <section class="pattern-block">
            <h2 class="section-label">Waking Life</h2>
            ${lens.waking.map((item) => `
              <div class="wake-row">
                <p class="wake-source">${escapeHtml(item.source)} · ${escapeHtml(item.when)}</p>
                <p class="wake-copy">${escapeHtml(item.text)}</p>
              </div>
            `).join("")}
          </section>
          <section class="pattern-block pattern-cope">
            <h2 class="section-label">How to Cope</h2>
            ${lens.cope.map((item) => `
              <div class="cope-row">
                <p class="cope-title">${escapeHtml(item.title)}</p>
                <p class="cope-detail">${escapeHtml(item.detail)}</p>
              </div>
            `).join("")}
          </section>
        </div>
        ${tabBar("patterns")}
      </section>
    `;
  }

  function renderReflect() {
    const dream = currentDream();
    if (!dream) return renderHome();
    return `
      <section class="screen">
        <div class="topbar">
          <button class="btn btn--ghost" data-action="close-reflect">Done</button>
          <h1>Reflect</h1>
          <span style="width:44px"></span>
        </div>
        <div class="chat">
          ${state.reflect.messages.map((m) => `<div class="bubble ${m.me ? "bubble--me" : "bubble--bot"}">${escapeHtml(m.text)}</div>`).join("")}
        </div>
        <form class="composer" data-action="send-reflect">
          <label class="visually-hidden" for="reflect-input">Your thought</label>
          <input class="input" id="reflect-input" placeholder="Type a thought" value="${escapeHtml(state.reflect.input)}" />
          <button class="btn btn--primary" type="submit" style="width:auto">Send</button>
        </form>
      </section>
    `;
  }

  const screens = {
    home: renderHome,
    capture: renderCapture,
    saved: renderSaved,
    story: renderStory,
    detail: renderDetail,
    timeline: renderTimeline,
    patterns: renderPatterns,
    reflect: renderReflect
  };

  function render() {
    const root = document.getElementById("app");
    const view = screens[state.screen] || renderHome;
    root.innerHTML = view();
    bindLiveFields();
    if (state.screen === "saved" && !savedTimer) {
      savedTimer = setTimeout(() => {
        savedTimer = null;
        go("story");
      }, 1800);
    }
  }

  function bindLiveFields() {
    const transcript = document.getElementById("transcript");
    if (transcript) {
      transcript.addEventListener("input", (e) => {
        state.capture.transcript = e.target.value;
        persist();
      });
    }
    const userRead = document.getElementById("user-read");
    if (userRead) {
      userRead.addEventListener("input", (e) => {
        const dream = currentDream();
        if (!dream) return;
        dream.userReflection = e.target.value;
        persist();
      });
    }
    const reflectInput = document.getElementById("reflect-input");
    if (reflectInput) {
      reflectInput.addEventListener("input", (e) => {
        state.reflect.input = e.target.value;
      });
    }
    const search = document.getElementById("timeline-search");
    if (search) {
      search.addEventListener("input", (e) => {
        state.timelineQuery = e.target.value;
        persist();
        const start = e.target.selectionStart;
        render();
        const again = document.getElementById("timeline-search");
        if (again) {
          again.focus();
          if (typeof start === "number") again.setSelectionRange(start, start);
        }
      });
      startSearchHints();
    }
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(() => {
      if (!state.capture.recording || !state.capture.startedAt) return;
      state.capture.elapsed = Math.floor((Date.now() - state.capture.startedAt) / 1000);
      const block = document.querySelector(".timer");
      if (block) {
        const m = String(Math.floor(state.capture.elapsed / 60)).padStart(2, "0");
        const s = String(state.capture.elapsed % 60).padStart(2, "0");
        block.innerHTML = `<span class="live-dot"></span>${m}:${s}`;
      }
    }, 250);
  }

  function stopTimer() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function stopDictation() {
    if (dictationTimer) {
      clearTimeout(dictationTimer);
      dictationTimer = null;
    }
  }

  function paintLiveTranscript() {
    const el = document.getElementById("live-transcript");
    if (!el) return;
    const committed = escapeHtml(state.capture.transcript);
    const gap = state.capture.transcript && state.capture.interim ? " " : "";
    const interim = state.capture.interim
      ? `<span class="interim">${gap}${escapeHtml(state.capture.interim)}</span>`
      : "";
    if (!committed && !interim) {
      el.innerHTML = `<span class="placeholder">Your words appear here…</span><span class="caret" aria-hidden="true"></span>`;
    } else {
      el.innerHTML = `${committed}${interim}<span class="caret" aria-hidden="true"></span>`;
    }
    el.scrollTop = el.scrollHeight;
  }

  function startDictation() {
    stopDictation();
    const phrases = SPOKEN_DREAMS[state.speechScriptIndex % SPOKEN_DREAMS.length];
    state.speechScriptIndex += 1;
    let i = 0;

    const step = () => {
      if (!state.capture.recording) return;
      if (i >= phrases.length) {
        finishSpokenCapture();
        return;
      }
      const phrase = phrases[i];
      state.capture.interim = phrase;
      paintLiveTranscript();
      const speakMs = 280 + phrase.length * 24;
      dictationTimer = setTimeout(() => {
        if (!state.capture.recording) return;
        state.capture.transcript = [state.capture.transcript, phrase].filter(Boolean).join(" ");
        state.capture.interim = "";
        paintLiveTranscript();
        i += 1;
        const pause = /[.…]$/.test(phrase) ? 560 : /,$/.test(phrase) ? 300 : 170;
        dictationTimer = setTimeout(step, pause);
      }, speakMs);
    };

    dictationTimer = setTimeout(step, 520);
  }

  function finishSpokenCapture() {
    stopDictation();
    stopTimer();
    if (state.capture.interim) {
      state.capture.transcript = [state.capture.transcript, state.capture.interim].filter(Boolean).join(" ");
      state.capture.interim = "";
    }
    state.capture.recording = false;
    state.capture.finished = true;
    persist();
    render();
  }

  function resetCapture() {
    stopDictation();
    stopTimer();
    state.capture = defaultState().capture;
  }

  function saveDream() {
    const transcript = state.capture.transcript.trim();
    if (!transcript) return;
    const draft = {
      id: `dream-${Date.now()}`,
      createdAt: new Date().toISOString(),
      rawTranscript: transcript,
      emotions: [],
      colors: []
    };
    const dream = enrich(draft, state.dreams);
    state.dreams = [dream, ...state.dreams];
    state.currentId = dream.id;
    state.story = { showLife: true, lifeDone: false, chip: null };
    resetCapture();
    go("saved");
  }

  function handleClick(event) {
    const goTab = event.target.closest("[data-go]");
    if (goTab) {
      const tab = goTab.getAttribute("data-go");
      go(tab, { tab, currentId: state.currentId });
      return;
    }

    const action = event.target.closest("[data-action]")?.getAttribute("data-action");
    const openDream = event.target.closest("[data-open-dream]")?.getAttribute("data-open-dream");
    const layer = event.target.closest("[data-layer]")?.getAttribute("data-layer");
    const lifeChip = event.target.closest("[data-life-chip]")?.getAttribute("data-life-chip");
    const sort = event.target.closest("[data-sort]")?.getAttribute("data-sort");
    const theme = event.target.closest("[data-theme]")?.getAttribute("data-theme");

    if (openDream) {
      go("detail", { currentId: openDream, detailLayer: "emotional", dreamOpen: false });
      return;
    }
    if (theme) {
      go("timeline", { tab: "timeline", timelineQuery: theme });
      return;
    }
    if (sort) {
      state.timelineSort = sort;
      persist();
      render();
      return;
    }
    if (layer) {
      state.detailLayer = layer;
      persist();
      render();
      return;
    }
    if (lifeChip) {
      if (lifeChip === "Skip") {
        state.story.lifeDone = true;
        persist();
        render();
        return;
      }
      const dream = currentDream();
      if (dream) dream.lifeEventNote = lifeChip;
      state.story.chip = lifeChip;
      state.story.lifeDone = true;
      persist();
      render();
      return;
    }

    switch (action) {
      case "clear-search":
        state.timelineQuery = "";
        persist();
        render();
        document.getElementById("timeline-search")?.focus();
        break;
      case "reset":
        sessionStorage.removeItem(STORAGE_KEY);
        state = defaultState();
        resetCapture();
        render();
        break;
      case "open-capture":
        resetCapture();
        go("capture");
        break;
      case "close-capture":
        resetCapture();
        go("home", { tab: "home" });
        break;
      case "toggle-mic":
        if (state.capture.recording) {
          finishSpokenCapture();
        } else {
          state.capture.recording = true;
          state.capture.finished = false;
          state.capture.transcript = "";
          state.capture.interim = "";
          state.capture.startedAt = Date.now();
          state.capture.elapsed = 0;
          startTimer();
          persist();
          render();
          startDictation();
        }
        break;
      case "save-dream":
        saveDream();
        break;
      case "toggle-dream":
        state.dreamOpen = !state.dreamOpen;
        persist();
        render();
        break;
      case "view-dream":
        go("detail", { detailLayer: "emotional", dreamOpen: false });
        break;
      case "skip-life":
        state.story.lifeDone = true;
        persist();
        render();
        break;
      case "done-story":
        go("home", { tab: "home" });
        break;
      case "back-detail":
        go(state.tab || "home");
        break;
      case "open-reflect": {
        const dream = currentDream();
        state.reflect = {
          messages: [{ me: false, text: "Does anything in your life connect to this dream?" }],
          input: ""
        };
        go("reflect", { currentId: dream?.id });
        break;
      }
      case "close-reflect":
        go("detail");
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    if (!event.target.closest("[data-action='send-reflect']")) return;
    event.preventDefault();
    const dream = currentDream();
    const text = (document.getElementById("reflect-input")?.value || "").trim();
    if (!text || !dream) return;
    state.reflect.messages.push({ me: true, text });
    state.reflect.input = "";
    persist();
    render();
    setTimeout(() => {
      state.reflect.messages.push({ me: false, text: reflectReply(text, dream) });
      persist();
      render();
    }, 700);
  }

  const SEARCH_HINTS = ["Search dreams", "Search by mood", "Search by symbol"];
  let hintTimer = null;
  let hintIndex = 0;

  function startSearchHints() {
    if (hintTimer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    hintTimer = setInterval(() => {
      const field = document.getElementById("timeline-search");
      if (!field || field.value) return;
      hintIndex = (hintIndex + 1) % SEARCH_HINTS.length;
      field.placeholder = SEARCH_HINTS[hintIndex];
    }, 3200);
  }

  function paintSky() {
    const canvas = document.getElementById("sky");
    const phone = document.getElementById("phone");
    if (!canvas || !phone) return;
    const ctx = canvas.getContext("2d");
    const stars = Array.from({ length: 70 }, (_, i) => {
      const roll = Math.random();
      let y;
      if (roll < 0.68) y = Math.random() * 0.26;
      else if (roll < 0.8) y = 0.26 + Math.random() * 0.46;
      else y = 0.72 + Math.random() * 0.28;
      return {
        x: Math.random(),
        y,
        r: [0.6, 1, 1.4, 2][i % 4],
        o: 0.22 + Math.random() * 0.6,
        gold: i % 7 === 0
      };
    });

    function resize() {
      canvas.width = phone.clientWidth;
      canvas.height = phone.clientHeight;
    }

    function draw(t) {
      const { width, height } = canvas;
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, "#141c38");
      g.addColorStop(0.45, "#0f172e");
      g.addColorStop(1, "#243057");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      stars.forEach((star, i) => {
        const twinkle = reduceMotion ? 1 : 0.78 + 0.22 * Math.sin(t / 1100 + i);
        let band = 1;
        if (star.y > 0.26 && star.y < 0.72) band = 0.1;
        else if (star.y >= 0.72) band = 0.45;
        const opacity = star.o * twinkle * band;
        ctx.fillStyle = star.gold ? `rgba(217,199,148,${opacity})` : `rgba(245,237,219,${opacity})`;
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    requestAnimationFrame(draw);
  }

  document.getElementById("app").addEventListener("click", handleClick);
  document.getElementById("app").addEventListener("submit", handleSubmit);
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (state.screen === "capture") {
      resetCapture();
      go("home", { tab: "home" });
    } else if (state.screen === "reflect") {
      go("detail");
    } else if (state.screen === "detail" || state.screen === "story") {
      go(state.tab || "home");
    }
  });
  paintSky();
  render();
})();
