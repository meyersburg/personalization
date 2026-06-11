import bmw330iImg from '../assets/vehicles/bmw-3series-2025.png';
import fordExpedition2025Img from '../assets/vehicles/ford-expedition-2025.png';
import kiaEv92025Img from '../assets/vehicles/kia-ev9-2025.png';
import toyotaHighlander2025Img from '../assets/vehicles/toyota-highlander-2025.png';
import audiQ52026Img from '../assets/vehicles/audi-q5-2026.png';
import corvetteZr12025Img from '../assets/vehicles/corvette-zr1-2025.png';
import jeepWrangler2026Img from '../assets/vehicles/jeep-wrangler-2026.png';
import bmwI42026Img from '../assets/vehicles/bmw-i4-2026.png';
import toyotaSienna2026Img from '../assets/vehicles/toyota-sienna-2026.png';
import rivianR1t2025Img from '../assets/vehicles/rivian-r1t-2025.png';
import dodgeRam2026Img from '../assets/vehicles/dodge-ram-2026.png';
import gmcSierra2026Img from '../assets/vehicles/gmc-sierra-2026.png';
import audiA52025Img from '../assets/vehicles/audi-a5-2025.png';
import teslaModely2024Img from '../assets/vehicles/tesla-modely-2024.png';
import chryslerPacifica2025Img from '../assets/vehicles/chrysler-pacifica-2025.png';
import vwIdbuzz2026Img from '../assets/vehicles/vw-idbuzz-2026.png';
import volvoXc902026Img from '../assets/vehicles/volvo-xc90-2026.png';
import audiRs52026Img from '../assets/vehicles/audi-rs5-2026.png';
import fordMustang2026Img from '../assets/vehicles/ford-mustang-2026.png';
import chevroletBolt2026Img from '../assets/vehicles/chevrolet-bolt-2026.png';
import hondaAccord2026Img from '../assets/vehicles/honda-accord-2026.png';
import audiAllroad2026Img from '../assets/vehicles/audi-allroad-2026.png';
import volvoV602026Img from '../assets/vehicles/volvo-v60-2026.png';
import audRs62026Img from '../assets/vehicles/aud-rs6-2026.png';
import bmwM5wagon2026Img from '../assets/vehicles/bmw-m5wagon-2026.png';
import mercedesEclasswagon2026Img from '../assets/vehicles/mercedes-eclasswagon-2026.png';
import mercedesEclassAMGwagon2026Img from '../assets/vehicles/mercedes-eclassAMGwagon-2026.png';
import porsche9112026Img from '../assets/vehicles/porsche-911-2026.png';
import vwGolf2026Img from '../assets/vehicles/vw-golf-2026.png';
import subaruWrx2026Img from '../assets/vehicles/subaru-wrx-2026.png';
import subaruImpreza2026Img from '../assets/vehicles/subaru-impreza-2026.png';
import hondaCivicR2026Img from '../assets/vehicles/honda-civicR-2026.png';
import mercedesEsprinter2026Img from '../assets/vehicles/mercedes-esprinter-2026.png';
import genesisGv702026Img from '../assets/vehicles/genesis-gv70-2026.png';
import hyundaiIonic52026Img from '../assets/vehicles/hyundai-ionic5-2026.png';
import jeepGladiator2025Img from '../assets/vehicles/jeep-gladiator-2025.png';
import bmw1series2026Img from '../assets/vehicles/bmw-1series-2026.png';
import porscheCayenne2026Img from '../assets/vehicles/porsche-cayenne-2026.png';
import kiaCarnival2026Img from '../assets/vehicles/kia-carnival-2026.png';
import autiEtronGT2026Img from '../assets/vehicles/auti-etronGT-2026.png';
import rivianR1s2026Img from '../assets/vehicles/rivian-r1s-2026.png';

export const inventory = [
  { id: 'bmw-330i-2025',        year: 2025, name: 'BMW 330i',           price: 53000, miles: 4,  fuelType: 'Gasoline', image: bmw330iImg,            category: 'sedan',     luxury: true,  electric: false, performance: true  },
  { id: 'ford-expedition-2025', year: 2025, name: 'Ford Expedition',    price: 74000, miles: 5,  fuelType: 'Gasoline', image: fordExpedition2025Img, category: 'suv',       luxury: false, electric: false, performance: false },
  { id: 'kia-ev9-2026',         year: 2026, name: 'KIA EV9',            price: 49500, miles: 12, fuelType: 'Electric', image: kiaEv92025Img,         category: 'suv',       luxury: false, electric: true,  performance: false },
  { id: 'toyota-highlander-2026', year: 2026, name: 'Toyota Highlander', price: 38000, miles: 11, fuelType: 'Hybrid',   image: toyotaHighlander2025Img, category: 'suv',    luxury: false, electric: false, performance: false },
  { id: 'audi-q5-hybrid-2025',  year: 2025, name: 'Audi Q5 Hybrid',    price: 55000, miles: 5,  fuelType: 'Hybrid',   image: audiQ52026Img,         category: 'suv',       luxury: true,  electric: false, performance: false },
  { id: 'corvette-zr1-2025',    year: 2025, name: 'Corvette ZR1',       price: 98700, miles: 35, fuelType: 'Gasoline', image: corvetteZr12025Img,    category: 'sports',    luxury: false, electric: false, performance: true  },
  { id: 'jeep-wrangler-2026',   year: 2026, name: 'Jeep Wrangler',      price: 34000, miles: 18, fuelType: 'Gasoline', image: jeepWrangler2026Img,   category: 'suv',       luxury: false, electric: false, performance: false },
  { id: 'bmw-i4-2026',          year: 2026, name: 'BMW i4',             price: 72400, miles: 3,  fuelType: 'Electric', image: bmwI42026Img,          category: 'sedan',     luxury: true,  electric: true,  performance: false },
  { id: 'toyota-sienna-2026',   year: 2026, name: 'Toyota Sienna',      price: 33000, miles: 6,  fuelType: 'Gasoline', image: toyotaSienna2026Img,   category: 'minivan',   luxury: false, electric: false, performance: false },
  { id: 'rivian-r1t-2025',      year: 2025, name: 'Rivian R1T',         price: 93500, miles: 30, fuelType: 'Electric', image: rivianR1t2025Img,      category: 'truck',     luxury: true,  electric: true,  performance: false },
  { id: 'dodge-ram-1500-2026',  year: 2026, name: 'Dodge Ram 1500',     price: 63000, miles: 45, fuelType: 'Gasoline', image: dodgeRam2026Img,       category: 'truck',     luxury: false, electric: false, performance: false },
  {
    id: 'gmc-sierra-2026',
    year: 2026,
    name: 'GMC Sierra',
    price: 78000,
    miles: 3,
    fuelType: 'Gasoline',
    image: gmcSierra2026Img,

    category: 'truck',
    luxury: false,
    electric: false,
    performance: false,
  },
  {
    id: 'audi-a5-2026',
    year: 2026,
    name: 'Audi A5',
    price: 62000,
    miles: 6,
    fuelType: 'Gasoline',
    image: audiA52025Img,

    category: 'sedan',
    luxury: true,
    electric: false,
    performance: false,
  },
  {
    id: 'tesla-model-y-2024',
    year: 2024,
    name: 'Tesla Model Y',
    price: 54000,
    miles: 23,
    fuelType: 'Electric',
    image: teslaModely2024Img,

    category: 'suv',
    luxury: false,
    electric: true,
    performance: false,
  },
  {
    id: 'chrysler-pacifica-2025',
    year: 2025,
    name: 'Chrysler Pacifica',
    price: 32000,
    miles: 8,
    fuelType: 'Gasoline',
    image: chryslerPacifica2025Img,

    category: 'minivan',
    luxury: false,
    electric: false,
    performance: false,
  },
  {
    id: 'volkswagen-idbuzz-2026',
    year: 2026,
    name: 'Volkswagen ID.Buzz',
    price: 65300,
    miles: 90,
    fuelType: 'Electric',
    image: vwIdbuzz2026Img,

    category: 'minivan',
    luxury: false,
    electric: true,
    performance: false,
  },
  {
    id: 'volvo-xc90-2026',
    year: 2026,
    name: 'Volvo XC90',
    price: 63900,
    miles: 30,
    fuelType: 'Plug-in Hybrid',
    image: volvoXc902026Img,

    category: 'suv',
    luxury: true,
    electric: false,
    performance: false,
  },
  {
    id: 'audi-rs5-2026',
    year: 2026,
    name: 'Audi RS5',
    price: 91900,
    miles: 40,
    fuelType: 'Gasoline',
    image: audiRs52026Img,

    category: 'sports',
    luxury: false,
    electric: false,
    performance: true,
  },
  {
    id: 'ford-mustang-2026',
    year: 2026,
    name: 'Ford Mustang',
    price: 45000,
    miles: 7,
    fuelType: 'Gasoline',
    image: fordMustang2026Img,

    category: 'sports',
    luxury: false,
    electric: false,
    performance: true,
  },
  {
    id: 'chevrolet-bolt-2026',
    year: 2026,
    name: 'Chevrolet Bolt',
    price: 28000,
    miles: 5,
    fuelType: 'Electric',
    image: chevroletBolt2026Img,

    category: 'hatchback',
    luxury: false,
    electric: true,
    performance: false,
  },
  {
    id: 'honda-accord-2026',
    year: 2026,
    name: 'Honda Accord',
    price: 36400,
    miles: 43,
    fuelType: 'Hybrid',
    image: hondaAccord2026Img,

    category: 'sedan',
    luxury: false,
    electric: false,
    performance: false,
  },
  {
    id: 'audi-allroad-2026',
    year: 2026,
    name: 'Audi Allroad',
    price: 62400,
    miles: 45,
    fuelType: 'Gasoline',
    image: audiAllroad2026Img,

    category: 'wagon',
    luxury: true,
    electric: false,
    performance: false,
  },
  {
    id: 'volvo-v60-cross-country-2026',
    year: 2026,
    name: 'Volvo V60 Cross Country',
    price: 56000,
    miles: 3,
    fuelType: 'Gasoline',
    image: volvoV602026Img,

    category: 'wagon',
    luxury: true,
    electric: false,
    performance: false,
  },
  {
    id: 'audi-rs6-avant-2026',
    year: 2026,
    name: 'Audi RS6 Avant',
    price: 132000,
    miles: 30,
    fuelType: 'Gasoline',
    image: audRs62026Img,

    category: 'wagon',
    luxury: true,
    electric: false,
    performance: true,
  },
  {
    id: 'bmw-m5-touring-2026',
    year: 2026,
    name: 'BMW M5 Touring',
    price: 130000,
    miles: 50,
    fuelType: 'Gasoline',
    image: bmwM5wagon2026Img,

    category: 'wagon',
    luxury: true,
    electric: false,
    performance: true,
  },
  {
    id: 'mercedes-benz-e-class-wagon-2026',
    year: 2026,
    name: 'Mercedes Benz E-Class Wagon',
    price: 83000,
    miles: 10,
    fuelType: 'Gasoline',
    image: mercedesEclasswagon2026Img,

    category: 'wagon',
    luxury: true,
    electric: false,
    performance: false,
  },
  {
    id: 'mercedes-benz-amg-e53-wagon-2026',
    year: 2026,
    name: 'Mercedes Benz AMG E53 Wagon',
    price: 135000,
    miles: 53,
    fuelType: 'Gasoline',
    image: mercedesEclassAMGwagon2026Img,

    category: 'wagon',
    luxury: true,
    electric: false,
    performance: true,
  },
  {
    id: 'porsche-911-carrera-2026',
    year: 2026,
    name: 'Porsche 911 Carrera',
    price: 135500,
    miles: 15,
    fuelType: 'Gasoline',
    image: porsche9112026Img,

    category: 'sports',
    luxury: true,
    electric: false,
    performance: true,
  },
  {
    id: 'volkswagen-golf-2026',
    year: 2026,
    name: 'Volkswagen Golf',
    price: 33900,
    miles: 2,
    fuelType: 'Gasoline',
    image: vwGolf2026Img,

    category: 'hatchback',
    luxury: false,
    electric: false,
    performance: false,
  },
  {
    id: 'subaru-wrx-2026',
    year: 2026,
    name: 'Subaru WRX',
    price: 35500,
    miles: 43,
    fuelType: 'Gasoline',
    image: subaruWrx2026Img,

    category: 'sedan',
    luxury: false,
    electric: false,
    performance: true,
  },
  {
    id: 'subaru-impreza-2026',
    year: 2026,
    name: 'Subaru Impreza',
    price: 27050,
    miles: 13,
    fuelType: 'Gasoline',
    image: subaruImpreza2026Img,

    category: 'hatchback',
    luxury: false,
    electric: false,
    performance: false,
  },
  {
    id: 'honda-civic-type-r-2026',
    year: 2026,
    name: 'Honda Civic Type R',
    price: 47400,
    miles: 18,
    fuelType: 'Gasoline',
    image: hondaCivicR2026Img,

    category: 'hatchback',
    luxury: false,
    electric: false,
    performance: true,
  },
  {
    id: 'mercedes-benz-esprinter-2026',
    year: 2026,
    name: 'Mercedes Benz eSprinter',
    price: 61200,
    miles: 10,
    fuelType: 'Electric',
    image: mercedesEsprinter2026Img,

    category: 'minivan',
    luxury: false,
    electric: true,
    performance: false,
  },
  {
    id: 'genesis-g70-shooting-brake-2026',
    year: 2026,
    name: 'Genesis G70 Shooting Brake',
    price: 43000,
    miles: 34,
    fuelType: 'Gasoline',
    image: genesisGv702026Img,

    category: 'wagon',
    luxury: false,
    electric: false,
    performance: false,
  },
  {
    id: 'hyundai-ioniq-5-2026',
    year: 2026,
    name: 'Hyundai Ioniq 5',
    price: 48400,
    miles: 3,
    fuelType: 'Electric',
    image: hyundaiIonic52026Img,

    category: 'hatchback',
    luxury: false,
    electric: true,
    performance: false,
  },
  {
    id: 'jeep-gladiator-2025',
    year: 2025,
    name: 'Jeep Gladiator',
    price: 36900,
    miles: 34,
    fuelType: 'Gasoline',
    image: jeepGladiator2025Img,

    category: 'truck',
    luxury: false,
    electric: false,
    performance: false,
  },
  {
    id: 'bmw-m140i-2026',
    year: 2026,
    name: 'BMW M140i',
    price: 23200,
    miles: 5,
    fuelType: 'Gasoline',
    image: bmw1series2026Img,

    category: 'hatchback',
    luxury: true,
    electric: false,
    performance: false,
  },
  {
    id: 'porsche-cayenne-2026',
    year: 2026,
    name: 'Porsche Cayenne',
    price: 89900,
    miles: 34,
    fuelType: 'Gasoline',
    image: porscheCayenne2026Img,

    category: 'suv',
    luxury: false,
    electric: false,
    performance: true,
  },
  {
    id: 'kia-carnival-prestige-2026',
    year: 2026,
    name: 'Kia Carnival Prestige',
    price: 51490,
    miles: 3,
    fuelType: 'Gasoline',
    image: kiaCarnival2026Img,

    category: 'minivan',
    luxury: false,
    electric: false,
    performance: true,
  },
  {
    id: 'audi-rs-e-tron-gt-2026',
    year: 2026,
    name: 'Audi RS e-tron GT',
    price: 170500,
    miles: 14,
    fuelType: 'Electric',
    image: autiEtronGT2026Img,

    category: 'sports',
    luxury: false,
    electric: true,
    performance: false,
  },
  {
    id: 'rivian-r1s-2026',
    year: 2026,
    name: 'Rivian R1S',
    price: 93500,
    miles: 14,
    fuelType: 'Electric',
    image: rivianR1s2026Img,

    category: 'suv',
    luxury: false,
    electric: true,
    performance: false,
  },
];
