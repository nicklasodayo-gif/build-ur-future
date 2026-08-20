import { Attribute, Building, Career, Challenge, CityStyle, GameMode, ChallengeOption, Scores } from "./types";

export const CITY_STYLES: { id: CityStyle; name: string; icon: string; tagline: string }[] = [
  { id: "metropolis", name: "Future Metropolis", icon: "🌆", tagline: "Technology, speed and possibility." },
  { id: "green", name: "Green City", icon: "🌿", tagline: "A cleaner future built around nature." },
  { id: "creative", name: "Creative City", icon: "🎨", tagline: "Arts, media and bold ideas everywhere." },
  { id: "industrial", name: "Industrial City", icon: "⚙️", tagline: "Engineering, infrastructure and making." },
];

const b = (id:string,name:string,icon:string,area:string,cost:number,population:number,scores:Partial<Record<Attribute,number>>):Building =>
  ({id,name,icon,area,cost,population,scores});

export const BUILDINGS: Building[] = [
  b("hospital","Hospital","🏥","Healthcare",20,260,{"Healthcare":5,"Collaboration":2}),
  b("school","School","🏫","Education",15,220,{"Communication":3,"Collaboration":3,"Leadership":1}),
  b("tech","Tech Hub","💻","Technology",20,300,{"Technology":5,"Problem Solving":2}),
  b("engineering","Engineering Center","🏗️","Engineering",18,280,{"Engineering":5,"Problem Solving":3}),
  b("creative","Creative Studio","🎨","Design / Creative",10,140,{"Creativity":5,"Communication":2}),
  b("finance","Financial Center","🏦","Finance / Business",15,250,{"Business":5,"Leadership":2}),
  b("stadium","Stadium","🏟️","Sports / Events",20,420,{"Communication":3,"Leadership":3,"Collaboration":2}),
  b("green","Green Energy Plant","🌱","Environment / Sustainability",18,180,{"Environment":5,"Engineering":2}),
  b("media","Media Studio","🎬","Media / Communications",10,150,{"Communication":5,"Creativity":3}),
  b("research","Research Lab","🚀","Science / Research",20,170,{"Science":5,"Problem Solving":3}),
  b("residential","Residential District","🏠","Urban Planning / Community",12,500,{"Collaboration":4,"Environment":2,"Leadership":1}),
  b("transport","Transport Hub","🚉","Transport / Logistics",15,340,{"Engineering":3,"Problem Solving":3,"Leadership":1}),
  b("library","Public Library","📚","Education / Community",8,120,{"Communication":3,"Creativity":2}),
  b("community","Community Center","🏘️","Community Services",10,200,{"Collaboration":4,"Leadership":2}),
  b("makers","Maker Space","🛠️","Innovation / Making",12,90,{"Creativity":4,"Engineering":2}),
  b("market","Farmers Market","🧺","Local Economy",6,80,{"Business":2,"Environment":1,"Collaboration":2}),
];

const o = (id:string,text:string,scores:Partial<Record<Attribute,number>>): ChallengeOption => ({id,text,scores});

export const CHALLENGES: Challenge[] = [
  {id:"power",icon:"⚡",title:"CITY POWER FAILURE",description:"Your city has lost electricity. Thousands of residents are affected.",options:[
    o("solar","Build a solar energy network.",{"Environment":4,"Engineering":2}),
    o("engineers","Hire electrical engineers.",{"Engineering":4,"Problem Solving":2}),
    o("reduce","Reduce city energy consumption.",{"Environment":3,"Leadership":2}),
    o("import","Import electricity from another city.",{"Business":3,"Collaboration":2})
  ]},
  {id:"flood",icon:"🌊",title:"FLOOD ALERT",description:"Heavy rain is approaching your city.",options:[
    o("drainage","Build drainage systems.",{"Engineering":4,"Problem Solving":2}),
    o("wetlands","Plant trees and restore wetlands.",{"Environment":5,"Collaboration":1}),
    o("relocate","Relocate residents.",{"Leadership":4,"Collaboration":2}),
    o("warning","Create an early-warning system.",{"Technology":4,"Science":2})
  ]},
  {id:"budget",icon:"💰",title:"BUDGET CRISIS",description:"Your city is running out of money.",options:[
    o("tax","Increase taxes.",{"Leadership":3,"Business":3}),
    o("investors","Find private investors.",{"Business":5,"Communication":2}),
    o("cut","Cut unnecessary spending.",{"Problem Solving":4,"Leadership":2}),
    o("district","Build a new business district.",{"Entrepreneurship":4,"Business":3})
  ]},
  {id:"hospital",icon:"🏥",title:"HOSPITAL OVERLOAD",description:"The city's hospital has reached maximum capacity.",options:[
    o("hospital2","Build another hospital.",{"Healthcare":4,"Leadership":2}),
    o("prevent","Invest in preventive healthcare.",{"Healthcare":5,"Science":2}),
    o("healthtech","Develop a health-tech solution.",{"Technology":4,"Healthcare":3}),
    o("staff","Recruit more medical staff.",{"Healthcare":4,"Collaboration":3})
  ]},
  {id:"traffic",icon:"🚗",title:"TRAFFIC CHAOS",description:"Traffic has brought the city to a standstill.",options:[
    o("roads","Build new roads.",{"Engineering":4,"Problem Solving":2}),
    o("public","Build public transport.",{"Engineering":3,"Environment":3}),
    o("smart","Introduce smart traffic technology.",{"Technology":5,"Problem Solving":2}),
    o("walk","Encourage cycling and walking.",{"Environment":4,"Leadership":2})
  ]},
  {id:"youth",icon:"👥",title:"YOUTH UNEMPLOYMENT",description:"Thousands of young people need opportunities.",options:[
    o("training","Build training centers.",{"Communication":3,"Collaboration":4}),
    o("techco","Attract technology companies.",{"Technology":4,"Business":3}),
    o("entrepreneurship","Fund entrepreneurship programs.",{"Entrepreneurship":5,"Business":2}),
    o("creative","Create creative industries.",{"Creativity":5,"Communication":2})
  ]},
  {id:"cyber",icon:"💻",title:"CYBER ATTACK",description:"The city's digital infrastructure has been compromised.",options:[
    o("security","Hire cybersecurity specialists.",{"Technology":5,"Problem Solving":3}),
    o("shutdown","Shut down vulnerable systems.",{"Leadership":3,"Problem Solving":4}),
    o("network","Build a new secure network.",{"Engineering":3,"Technology":4}),
    o("investigate","Investigate who is responsible.",{"Science":3,"Problem Solving":3})
  ]},
  {id:"climate",icon:"🌍",title:"CLIMATE CRISIS",description:"The city's pollution levels are rising.",options:[
    o("renewable","Invest in renewable energy.",{"Environment":5,"Engineering":2}),
    o("regulation","Introduce strict environmental regulations.",{"Leadership":4,"Environment":3}),
    o("transport","Build more public transport.",{"Environment":3,"Engineering":3}),
    o("research","Fund climate research.",{"Science":5,"Environment":3})
  ]},
  {id:"festival",icon:"🎉",title:"CITY FESTIVAL",description:"The city wants to host a major international festival.",options:[
    o("stadium","Build a stadium.",{"Leadership":3,"Collaboration":3}),
    o("arts","Create an arts district.",{"Creativity":5,"Communication":2}),
    o("tech","Develop a technology experience.",{"Technology":4,"Creativity":3}),
    o("marketing","Launch a global marketing campaign.",{"Business":4,"Communication":4})
  ]},
  {id:"discovery",icon:"🚀",title:"SCIENTIFIC DISCOVERY",description:"Scientists have discovered something that could transform the city.",options:[
    o("fund","Fund research.",{"Science":5,"Problem Solving":2}),
    o("company","Build a technology company.",{"Technology":4,"Entrepreneurship":4}),
    o("protect","Protect the discovery.",{"Leadership":3,"Science":3}),
    o("commercial","Turn it into a commercial product.",{"Business":4,"Entrepreneurship":4})
  ]}
];

// Additional activities / challenges
CHALLENGES.push(
  {id:"housing",icon:"🏚️",title:"HOUSING SHORTAGE",description:"Rents are rising and many residents need affordable homes.",options:[
    o("buildaff","Build affordable housing.",{"Engineering":4,"Collaboration":2}),
    o("incentives","Offer developer incentives.",{"Business":3,"Leadership":2}),
    o("reuse","Convert underused buildings.",{"Engineering":3,"Problem Solving":3}),
    o("regulate","Introduce rent controls.",{"Leadership":4,"Collaboration":1})
  ]},
  {id:"startup",icon:"💡",title:"STARTUP BOOM",description:"A wave of startups wants to move into your city.",options:[
    o("zones","Create innovation zones.",{"Entrepreneurship":4,"Business":2}),
    o("grants","Offer grants and incubators.",{"Entrepreneurship":4,"Science":1}),
    o("taxbreaks","Give tax breaks.",{"Business":3,"Leadership":2}),
    o("diversity","Focus on inclusive hiring.",{"Collaboration":3,"Communication":2})
  ]}
);

const career = (id:string,name:string,archetype:string,description:string,skills:string[],subjects:string[],environments:string[],related:string[],weights:Partial<Scores>):Career =>
  ({id,name,archetype,description,skills,subjects,environments,related,weights});

export const CAREERS: Career[] = [
  career("software","Software Engineer","THE INNOVATOR","Build software, apps and digital systems that solve real problems.",["Problem solving","Programming","Logic","Creativity"],["Mathematics","Computer Science","Physics"],["Tech companies","Startups","Remote teams"],["AI Engineer","Cybersecurity Specialist","Data Scientist","Game Developer"],{"Technology":1,"Problem Solving":1,"Science":.25}),
  career("robotics","Robotics Engineer","THE BUILDER","Design machines and intelligent systems that interact with the real world.",["Engineering","Programming","Systems thinking"],["Mathematics","Physics","Computer Science"],["Labs","Manufacturing","R&D teams"],["Mechanical Engineer","AI Engineer","Automation Specialist"],{"Engineering":1,"Technology":.7,"Problem Solving":1}),
  career("civil","Civil Engineer","THE BUILDER","Design infrastructure such as bridges, buildings, roads and water systems.",["Planning","Math","Problem solving","Technical design"],["Mathematics","Physics","Geography"],["Construction sites","Engineering firms","Government projects"],["Architect","Urban Planner","Structural Engineer"],{"Engineering":1,"Problem Solving":.8,"Environment":.25}),
  career("urban","Urban Planner","THE BUILDER","Shape how communities, transport and public spaces work together.",["Systems thinking","Research","Communication","Planning"],["Geography","Mathematics","Business"],["City authorities","Consultancies","Community projects"],["Civil Engineer","Architect","Transport Planner"],{"Engineering":.65,"Leadership":.45,"Environment":.5,"Collaboration":.6}),
  career("data","Data Scientist","THE INNOVATOR","Turn large amounts of information into useful insights and predictions.",["Statistics","Logic","Coding","Curiosity"],["Mathematics","Computer Science","Science"],["Tech teams","Research labs","Business analytics"],["AI Engineer","Research Scientist","Software Engineer"],{"Technology":.8,"Science":.8,"Problem Solving":1}),
  career("designer","UX Designer","THE CREATOR","Design digital experiences that are useful, intuitive and enjoyable.",["Empathy","Creativity","Research","Prototyping"],["Art & Design","Computer Science","Business"],["Design studios","Product teams","Agencies"],["Product Designer","Graphic Designer","Creative Director"],{"Creativity":1,"Communication":.6,"Problem Solving":.5}),
  career("architect","Architect","THE CREATOR","Imagine and shape buildings and spaces for the people who use them.",["Design","Visualization","Planning","Communication"],["Art & Design","Mathematics","Physics"],["Studios","Construction","Urban projects"],["Urban Planner","Civil Engineer","Interior Designer"],{"Creativity":1,"Engineering":.65,"Communication":.45}),
  career("producer","producer","THE CREATOR","Bring creative projects from an idea to a finished experience.",["Organization","Communication","Creative thinking"],["Media","Business","Art & Design"],["Studios","Events","Production companies"],["Creative Director","Event Producer","Marketing Manager"],{"Creativity":.8,"Communication":.8,"Leadership":.65}),
  career("entrepreneur","Entrepreneur","THE ENTREPRENEUR","Spot opportunities, build ideas and bring people together around a vision.",["Leadership","Communication","Risk thinking","Problem solving"],["Business","Mathematics","Communication"],["Startups","Businesses","Accelerators"],["Product Manager","Business Owner","Marketing Strategist"],{"Business":1,"Leadership":1,"Creativity":.6,"Problem Solving":.5}),
  career("manager","Project Manager","THE LEADER","Coordinate people, budgets and timelines to turn plans into results.",["Planning","Leadership","Communication","Organization"],["Business","Mathematics","Communication"],["Companies","Agencies","Construction projects"],["Consultant","Operations Manager","Product Manager"],{"Leadership":1,"Business":.7,"Communication":.8}),
  career("doctor","Doctor","THE CARE GIVER","Use science, communication and careful decisions to help people stay healthy.",["Science","Empathy","Decision making","Communication"],["Biology","Chemistry","Mathematics"],["Hospitals","Clinics","Research"],["Nurse","Public Health Specialist","Medical Researcher"],{"Healthcare":1,"Science":.45,"Communication":.65,"Collaboration":.7}),
  career("publichealth","Public Health Specialist","THE CARE GIVER","Improve health at a community and population level.",["Research","Communication","Collaboration","Planning"],["Biology","Geography","Statistics"],["Government","NGOs","Health organizations"],["Doctor","Epidemiologist","Health Policy Analyst"],{"Healthcare":1,"Collaboration":.8,"Environment":.35}),
  career("climate","Climate Scientist","THE EXPLORER","Study Earth's climate and help communities understand future environmental change.",["Research","Data analysis","Curiosity","Systems thinking"],["Physics","Geography","Biology","Mathematics"],["Research institutes","Universities","Field projects"],["Environmental Scientist","Geologist","Data Scientist"],{"Science":1,"Environment":1,"Problem Solving":.7}),
  career("journalist","Journalist","THE CONNECTOR","Investigate stories, ask questions and communicate information to audiences.",["Writing","Research","Interviewing","Critical thinking"],["English","History","Media Studies"],["Newsrooms","Field reporting","Digital media"],["Communications Specialist","Documentary Producer","Editor"],{"Communication":1,"Problem Solving":.45,"Leadership":.3}),
  career("teacher","Teacher","THE CONNECTOR","Help young people understand ideas, develop confidence and discover possibilities.",["Communication","Patience","Planning","Collaboration"],["Any strong subject","Education","Communication"],["Schools","Training centers","Community programs"],["Trainer","Education Consultant","Youth Program Manager"],{"Communication":1,"Collaboration":.9,"Leadership":.5}),
  career("environmental","Environmental Scientist","THE EXPLORER","Study ecosystems and develop evidence-based ways to protect the environment.",["Research","Fieldwork","Data","Problem solving"],["Biology","Chemistry","Geography"],["Labs","Field sites","Environmental organizations"],["Climate Scientist","Conservation Scientist","Ecologist"],{"Environment":1,"Science":.9,"Problem Solving":.55})
];

export const ATTRIBUTES: Attribute[] = ["Technology","Engineering","Creativity","Science","Healthcare","Business","Leadership","Communication","Environment","Problem Solving","Collaboration","Entrepreneurship"];

export const MODES: {id:GameMode,name:string,time:string,builds:number,challenges:number,desc:string}[] = [
  {id:"quick",name:"QUICK BUILD",time:"2–3 min",builds:5,challenges:3,desc:"Fast, energetic mode for events and kiosks."},
  {id:"career",name:"CAREER CHALLENGE",time:"5–7 min",builds:10,challenges:6,desc:"The full city-building and career discovery experience."},
  {id:"free",name:"FREE BUILD",time:"Open play",builds:99,challenges:0,desc:"Experiment freely. Career scoring is switched off."}
];

export const CITY_MULTIPLIERS: Record<CityStyle, Partial<Scores>> = {
  metropolis:{Technology:1.05},
  green:{Environment:1.05},
  creative:{Creativity:1.05},
  industrial:{Engineering:1.05}
};
