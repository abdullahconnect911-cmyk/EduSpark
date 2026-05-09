'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';

// ─────────────────────────────────────────────────────────────────────────────
// UNIVERSITY DATA — TO ADD A NEW UNIVERSITY:
// Copy any entry below and fill in the fields.
// levels: 'Bachelor' | 'Masters' | 'PhD' | 'Diploma' | 'Foundation' | 'Certificate' | 'Advance Diploma'
// offerLetter: 'Free Offer Letter' | 'Conditional Offer'
// country: must match one of the LOCATIONS list exactly
// ─────────────────────────────────────────────────────────────────────────────
const universities = [
  // ── MALAYSIA ──────────────────────────────────────────────────────────────
  { name: 'Universiti Malaya', short: 'UM', country: 'Malaysia', city: 'Kuala Lumpur', levels: ['Bachelor','Masters','PhD'], tags: ['Medicine','Engineering','Business','Law'], offerLetter: 'Free Offer Letter', ranking: 'QS Top 200', tuition: '$4K–$8K/yr' },
  { name: 'Universiti Kebangsaan Malaysia', short: 'UKM', country: 'Malaysia', city: 'Bangi', levels: ['Bachelor','Masters','PhD'], tags: ['Science','Medicine','Engineering','Social Sciences'], offerLetter: 'Free Offer Letter', ranking: 'QS Top 400', tuition: '$3K–$7K/yr' },
  { name: 'Universiti Putra Malaysia', short: 'UPM', country: 'Malaysia', city: 'Serdang', levels: ['Bachelor','Masters','PhD'], tags: ['Agriculture','Engineering','Science','Business'], offerLetter: 'Free Offer Letter', ranking: 'QS Top 300', tuition: '$3K–$7K/yr' },
  { name: 'Universiti Sains Malaysia', short: 'USM', country: 'Malaysia', city: 'Penang', levels: ['Bachelor','Masters','PhD'], tags: ['Science','Medicine','Engineering','Arts'], offerLetter: 'Free Offer Letter', ranking: 'QS Top 250', tuition: '$3K–$7K/yr' },
  { name: 'Universiti Teknologi Malaysia', short: 'UTM', country: 'Malaysia', city: 'Johor Bahru', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','IT','Architecture','Science'], offerLetter: 'Free Offer Letter', ranking: 'QS Top 350', tuition: '$3K–$7K/yr' },
  { name: "Taylor's University", short: 'TU', country: 'Malaysia', city: 'Subang Jaya', levels: ['Bachelor','Masters'], tags: ['Hospitality','Business','Architecture','IT'], offerLetter: 'Free Offer Letter', ranking: 'Top Private', tuition: '$5K–$10K/yr' },
  { name: 'UCSI University', short: 'UCSI', country: 'Malaysia', city: 'Kuala Lumpur', levels: ['Bachelor','Masters'], tags: ['Pharmacy','Medicine','Architecture','Music'], offerLetter: 'Free Offer Letter', ranking: 'Top Private', tuition: '$4K–$9K/yr' },
  { name: 'Sunway University', short: 'SU', country: 'Malaysia', city: 'Bandar Sunway', levels: ['Bachelor','Masters'], tags: ['Business','Medicine','Science','IT'], offerLetter: 'Free Offer Letter', ranking: 'Top Private', tuition: '$5K–$11K/yr' },
  { name: 'Asia Pacific University', short: 'APU', country: 'Malaysia', city: 'Kuala Lumpur', levels: ['Bachelor','Masters'], tags: ['IT','Engineering','Business','Media'], offerLetter: 'Free Offer Letter', ranking: 'Top 5 Private', tuition: '$4K–$9K/yr' },
  { name: 'INTI International University', short: 'INTI', country: 'Malaysia', city: 'Nilai', levels: ['Bachelor','Masters'], tags: ['Business','IT','Engineering','Media'], offerLetter: 'Free Offer Letter', ranking: '', tuition: '$3K–$7K/yr' },
  { name: 'Universiti Teknologi PETRONAS', short: 'UTP', country: 'Malaysia', city: 'Seri Iskandar', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','IT','Science','Business'], offerLetter: 'Free Offer Letter', ranking: 'Top Engineering', tuition: '$5K–$10K/yr' },
  { name: 'Multimedia University', short: 'MMU', country: 'Malaysia', city: 'Cyberjaya', levels: ['Bachelor','Masters'], tags: ['IT','Engineering','Media','Law'], offerLetter: 'Free Offer Letter', ranking: 'Top Private', tuition: '$4K–$8K/yr' },
  { name: 'Universiti Tenaga Nasional', short: 'UNITEN', country: 'Malaysia', city: 'Kajang', levels: ['Bachelor','Masters'], tags: ['Engineering','IT','Business','Science'], offerLetter: 'Free Offer Letter', ranking: '', tuition: '$4K–$8K/yr' },
  { name: 'SEGi University', short: 'SEGi', country: 'Malaysia', city: 'Kota Damansara', levels: ['Bachelor','Masters'], tags: ['Medicine','Dentistry','Business','IT'], offerLetter: 'Free Offer Letter', ranking: '', tuition: '$3K–$7K/yr' },
  { name: 'Management and Science University', short: 'MSU', country: 'Malaysia', city: 'Shah Alam', levels: ['Bachelor','Masters'], tags: ['Business','IT','Health Sciences','Engineering'], offerLetter: 'Free Offer Letter', ranking: '', tuition: '$3K–$7K/yr' },
  { name: 'Monash University Malaysia', short: 'Monash MY', country: 'Malaysia', city: 'Bandar Sunway', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Business','IT','Medicine'], offerLetter: 'Free Offer Letter', ranking: 'QS Top 60', tuition: '$8K–$18K/yr' },
  { name: 'University of Nottingham Malaysia', short: 'UNM', country: 'Malaysia', city: 'Semenyih', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Business','Science','Law'], offerLetter: 'Free Offer Letter', ranking: 'QS Top 100', tuition: '$7K–$15K/yr' },
  { name: 'University of Southampton Malaysia', short: 'UoSM', country: 'Malaysia', city: 'Johor Bahru', levels: ['Bachelor','Masters'], tags: ['Engineering','IT','Business','Science'], offerLetter: 'Free Offer Letter', ranking: 'QS Top 100', tuition: '$7K–$14K/yr' },
  { name: 'MAHSA University', short: 'MAHSA', country: 'Malaysia', city: 'Bandar Saujana Putra', levels: ['Bachelor','Masters'], tags: ['Medicine','Nursing','Pharmacy','Dentistry'], offerLetter: 'Free Offer Letter', ranking: '', tuition: '$4K–$9K/yr' },
  { name: 'University of Wollongong Malaysia', short: 'UOWM', country: 'Malaysia', city: 'Petaling Jaya', levels: ['Bachelor','Masters'], tags: ['Business','IT','Engineering','Media'], offerLetter: 'Free Offer Letter', ranking: '', tuition: '$5K–$10K/yr' },

  // ── JAPAN ─────────────────────────────────────────────────────────────────
  { name: 'University of Tokyo', short: 'UTokyo', country: 'Japan', city: 'Tokyo', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Science','Medicine','Law'], offerLetter: 'Conditional Offer', ranking: 'QS Top 30', tuition: '$5K–$8K/yr' },
  { name: 'Kyoto University', short: 'KyotoU', country: 'Japan', city: 'Kyoto', levels: ['Bachelor','Masters','PhD'], tags: ['Science','Engineering','Medicine','Humanities'], offerLetter: 'Conditional Offer', ranking: 'QS Top 50', tuition: '$5K–$8K/yr' },
  { name: 'Osaka University', short: 'OsakaU', country: 'Japan', city: 'Osaka', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Medicine','Science','Business'], offerLetter: 'Conditional Offer', ranking: 'QS Top 80', tuition: '$5K–$8K/yr' },
  { name: 'Tohoku University', short: 'Tohoku', country: 'Japan', city: 'Sendai', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Science','Medicine','Arts'], offerLetter: 'Conditional Offer', ranking: 'QS Top 100', tuition: '$5K–$8K/yr' },
  { name: 'Nagoya University', short: 'Nagoya', country: 'Japan', city: 'Nagoya', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Science','Law','Medicine'], offerLetter: 'Conditional Offer', ranking: 'QS Top 150', tuition: '$5K–$8K/yr' },
  { name: 'Kyushu University', short: 'Kyushu', country: 'Japan', city: 'Fukuoka', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Agriculture','Science','Design'], offerLetter: 'Conditional Offer', ranking: 'QS Top 150', tuition: '$5K–$8K/yr' },
  { name: 'Hokkaido University', short: 'Hokkaido', country: 'Japan', city: 'Sapporo', levels: ['Bachelor','Masters','PhD'], tags: ['Agriculture','Engineering','Medicine','Science'], offerLetter: 'Conditional Offer', ranking: 'QS Top 200', tuition: '$5K–$8K/yr' },
  { name: 'Tokyo Institute of Technology', short: 'TokyoTech', country: 'Japan', city: 'Tokyo', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Science','IT','Architecture'], offerLetter: 'Conditional Offer', ranking: 'QS Top 60', tuition: '$5K–$8K/yr' },
  { name: 'Waseda University', short: 'Waseda', country: 'Japan', city: 'Tokyo', levels: ['Bachelor','Masters','PhD'], tags: ['Business','Law','Science','Arts'], offerLetter: 'Conditional Offer', ranking: 'QS Top 200', tuition: '$6K–$10K/yr' },
  { name: 'Keio University', short: 'Keio', country: 'Japan', city: 'Tokyo', levels: ['Bachelor','Masters','PhD'], tags: ['Medicine','Business','Law','Engineering'], offerLetter: 'Conditional Offer', ranking: 'QS Top 200', tuition: '$6K–$10K/yr' },
  { name: 'Ritsumeikan University', short: 'Ritsumeikan', country: 'Japan', city: 'Kyoto', levels: ['Bachelor','Masters','PhD'], tags: ['IT','Business','Law','Science'], offerLetter: 'Conditional Offer', ranking: '', tuition: '$6K–$10K/yr' },
  { name: 'Ritsumeikan Asia Pacific University', short: 'APU Japan', country: 'Japan', city: 'Beppu', levels: ['Bachelor','Masters'], tags: ['Business','Tourism','IT','International Studies'], offerLetter: 'Conditional Offer', ranking: '', tuition: '$6K–$10K/yr' },
  { name: 'University of Tsukuba', short: 'Tsukuba', country: 'Japan', city: 'Tsukuba', levels: ['Bachelor','Masters','PhD'], tags: ['Science','Engineering','Business','Arts'], offerLetter: 'Conditional Offer', ranking: 'QS Top 300', tuition: '$5K–$8K/yr' },

  // ── SINGAPORE ─────────────────────────────────────────────────────────────
  { name: 'National University of Singapore', short: 'NUS', country: 'Singapore', city: 'Singapore', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Business','Medicine','Law'], offerLetter: 'Conditional Offer', ranking: 'QS Top 10', tuition: '$10K–$22K/yr' },
  { name: 'Nanyang Technological University', short: 'NTU', country: 'Singapore', city: 'Singapore', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Business','Science','Arts'], offerLetter: 'Conditional Offer', ranking: 'QS Top 15', tuition: '$10K–$22K/yr' },
  { name: 'Singapore Management University', short: 'SMU', country: 'Singapore', city: 'Singapore', levels: ['Bachelor','Masters'], tags: ['Business','Law','IT','Social Sciences'], offerLetter: 'Free Offer Letter', ranking: 'QS Top 500', tuition: '$12K–$25K/yr' },
  { name: 'Singapore University of Technology & Design', short: 'SUTD', country: 'Singapore', city: 'Singapore', levels: ['Bachelor','Masters'], tags: ['Engineering','Architecture','IT','Design'], offerLetter: 'Free Offer Letter', ranking: '', tuition: '$10K–$20K/yr' },
  { name: 'Singapore Institute of Technology', short: 'SIT', country: 'Singapore', city: 'Singapore', levels: ['Bachelor','Masters'], tags: ['Engineering','IT','Health Sciences','Business'], offerLetter: 'Free Offer Letter', ranking: '', tuition: '$8K–$15K/yr' },
  { name: 'Kaplan Singapore', short: 'Kaplan SG', country: 'Singapore', city: 'Singapore', levels: ['Diploma','Bachelor','Masters'], tags: ['Business','IT','Media','Hospitality'], offerLetter: 'Free Offer Letter', ranking: '', tuition: '$8K–$18K/yr' },
  { name: 'PSB Academy', short: 'PSB', country: 'Singapore', city: 'Singapore', levels: ['Diploma','Bachelor','Masters'], tags: ['Business','Engineering','IT','Hospitality'], offerLetter: 'Free Offer Letter', ranking: '', tuition: '$7K–$15K/yr' },
  { name: 'SIM Global Education', short: 'SIM', country: 'Singapore', city: 'Singapore', levels: ['Diploma','Bachelor','Masters'], tags: ['Business','IT','Psychology','Media'], offerLetter: 'Free Offer Letter', ranking: '', tuition: '$7K–$15K/yr' },

  // ── SOUTH KOREA ───────────────────────────────────────────────────────────
  { name: 'Seoul National University', short: 'SNU', country: 'South Korea', city: 'Seoul', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Medicine','Business','Law'], offerLetter: 'Conditional Offer', ranking: 'QS Top 35', tuition: '$4K–$9K/yr' },
  { name: 'KAIST', short: 'KAIST', country: 'South Korea', city: 'Daejeon', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Science','IT','Business'], offerLetter: 'Conditional Offer', ranking: 'QS Top 50', tuition: '$4K–$9K/yr' },
  { name: 'POSTECH', short: 'POSTECH', country: 'South Korea', city: 'Pohang', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Science','IT'], offerLetter: 'Conditional Offer', ranking: 'QS Top 100', tuition: '$4K–$8K/yr' },
  { name: 'Yonsei University', short: 'Yonsei', country: 'South Korea', city: 'Seoul', levels: ['Bachelor','Masters','PhD'], tags: ['Medicine','Business','Engineering','Arts'], offerLetter: 'Conditional Offer', ranking: 'QS Top 80', tuition: '$5K–$10K/yr' },
  { name: 'Korea University', short: 'KU', country: 'South Korea', city: 'Seoul', levels: ['Bachelor','Masters','PhD'], tags: ['Business','Law','Engineering','Science'], offerLetter: 'Conditional Offer', ranking: 'QS Top 80', tuition: '$5K–$10K/yr' },
  { name: 'Hanyang University', short: 'Hanyang', country: 'South Korea', city: 'Seoul', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Architecture','Business','Arts'], offerLetter: 'Conditional Offer', ranking: 'QS Top 200', tuition: '$5K–$10K/yr' },
  { name: 'Kyung Hee University', short: 'KHU', country: 'South Korea', city: 'Seoul', levels: ['Bachelor','Masters','PhD'], tags: ['Medicine','Business','Tourism','Arts'], offerLetter: 'Conditional Offer', ranking: 'QS Top 350', tuition: '$5K–$10K/yr' },
  { name: 'Ewha Womans University', short: 'Ewha', country: 'South Korea', city: 'Seoul', levels: ['Bachelor','Masters','PhD'], tags: ['Arts','Business','Science','Law'], offerLetter: 'Conditional Offer', ranking: 'QS Top 350', tuition: '$5K–$10K/yr' },

  // ── CHINA ─────────────────────────────────────────────────────────────────
  { name: 'Tsinghua University', short: 'Tsinghua', country: 'China', city: 'Beijing', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Science','Business','Architecture'], offerLetter: 'Conditional Offer', ranking: 'QS Top 25', tuition: '$3K–$8K/yr' },
  { name: 'Peking University', short: 'PKU', country: 'China', city: 'Beijing', levels: ['Bachelor','Masters','PhD'], tags: ['Medicine','Law','Arts','Science'], offerLetter: 'Conditional Offer', ranking: 'QS Top 20', tuition: '$3K–$8K/yr' },
  { name: 'Fudan University', short: 'Fudan', country: 'China', city: 'Shanghai', levels: ['Bachelor','Masters','PhD'], tags: ['Medicine','Business','Law','Science'], offerLetter: 'Conditional Offer', ranking: 'QS Top 50', tuition: '$3K–$8K/yr' },
  { name: 'Shanghai Jiao Tong University', short: 'SJTU', country: 'China', city: 'Shanghai', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Medicine','Business','Science'], offerLetter: 'Conditional Offer', ranking: 'QS Top 60', tuition: '$3K–$8K/yr' },
  { name: 'Zhejiang University', short: 'ZJU', country: 'China', city: 'Hangzhou', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Science','Agriculture','Arts'], offerLetter: 'Conditional Offer', ranking: 'QS Top 60', tuition: '$3K–$8K/yr' },
  { name: 'University of Science and Technology of China', short: 'USTC', country: 'China', city: 'Hefei', levels: ['Bachelor','Masters','PhD'], tags: ['Science','Engineering','IT','Physics'], offerLetter: 'Conditional Offer', ranking: 'QS Top 100', tuition: '$3K–$7K/yr' },
  { name: 'Nanjing University', short: 'NJU', country: 'China', city: 'Nanjing', levels: ['Bachelor','Masters','PhD'], tags: ['Science','Arts','Business','Law'], offerLetter: 'Conditional Offer', ranking: 'QS Top 150', tuition: '$3K–$7K/yr' },
  { name: 'Sun Yat-sen University', short: 'SYSU', country: 'China', city: 'Guangzhou', levels: ['Bachelor','Masters','PhD'], tags: ['Medicine','Business','Engineering','Law'], offerLetter: 'Conditional Offer', ranking: 'QS Top 200', tuition: '$3K–$7K/yr' },
  { name: 'Beijing Normal University', short: 'BNU', country: 'China', city: 'Beijing', levels: ['Bachelor','Masters','PhD'], tags: ['Education','Psychology','Arts','Science'], offerLetter: 'Conditional Offer', ranking: 'QS Top 300', tuition: '$3K–$7K/yr' },

  // ── UNITED KINGDOM ────────────────────────────────────────────────────────
  { name: 'University of Oxford', short: 'Oxford', country: 'UK', city: 'Oxford', levels: ['Bachelor','Masters','PhD'], tags: ['Law','Medicine','Science','Arts'], offerLetter: 'Conditional Offer', ranking: 'QS #1', tuition: '$28K–$45K/yr' },
  { name: 'University of Cambridge', short: 'Cambridge', country: 'UK', city: 'Cambridge', levels: ['Bachelor','Masters','PhD'], tags: ['Science','Engineering','Law','Medicine'], offerLetter: 'Conditional Offer', ranking: 'QS #2', tuition: '$28K–$45K/yr' },
  { name: 'University of Manchester', short: 'UoM', country: 'UK', city: 'Manchester', levels: ['Bachelor','Masters','PhD'], tags: ['Business','Engineering','Science','Arts'], offerLetter: 'Conditional Offer', ranking: 'QS Top 50', tuition: '$20K–$32K/yr' },
  { name: 'University of Birmingham', short: 'UoB', country: 'UK', city: 'Birmingham', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Medicine','Business','Law'], offerLetter: 'Conditional Offer', ranking: 'QS Top 100', tuition: '$18K–$28K/yr' },
  { name: 'University of Glasgow', short: 'Glasgow', country: 'UK', city: 'Glasgow', levels: ['Bachelor','Masters','PhD'], tags: ['Medicine','Law','Engineering','Arts'], offerLetter: 'Conditional Offer', ranking: 'QS Top 100', tuition: '$18K–$28K/yr' },
  { name: 'University of Leeds', short: 'Leeds', country: 'UK', city: 'Leeds', levels: ['Bachelor','Masters','PhD'], tags: ['Business','Engineering','Science','Media'], offerLetter: 'Conditional Offer', ranking: 'QS Top 100', tuition: '$18K–$28K/yr' },
  { name: 'University of Nottingham', short: 'UoN', country: 'UK', city: 'Nottingham', levels: ['Bachelor','Masters','PhD'], tags: ['Pharmacy','Engineering','Business','Law'], offerLetter: 'Conditional Offer', ranking: 'QS Top 100', tuition: '$18K–$28K/yr' },
  { name: 'University of Sheffield', short: 'Sheffield', country: 'UK', city: 'Sheffield', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Architecture','Medicine','Arts'], offerLetter: 'Conditional Offer', ranking: 'QS Top 100', tuition: '$18K–$28K/yr' },
  { name: 'Coventry University', short: 'Coventry', country: 'UK', city: 'Coventry', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Business','Media','Law'], offerLetter: 'Conditional Offer', ranking: '', tuition: '$14K–$22K/yr' },
  { name: 'University of Hertfordshire', short: 'Herts', country: 'UK', city: 'Hatfield', levels: ['Bachelor','Masters','PhD'], tags: ['IT','Engineering','Business','Pharmacy'], offerLetter: 'Conditional Offer', ranking: '', tuition: '$13K–$20K/yr' },
  { name: 'Northumbria University', short: 'Northumbria', country: 'UK', city: 'Newcastle', levels: ['Bachelor','Masters','PhD'], tags: ['Law','Business','Design','Engineering'], offerLetter: 'Conditional Offer', ranking: '', tuition: '$13K–$20K/yr' },
  { name: 'University of East London', short: 'UEL', country: 'UK', city: 'London', levels: ['Bachelor','Masters','PhD'], tags: ['Business','IT','Psychology','Architecture'], offerLetter: 'Conditional Offer', ranking: '', tuition: '$13K–$20K/yr' },

  // ── GERMANY ───────────────────────────────────────────────────────────────
  { name: 'Technical University of Munich', short: 'TUM', country: 'Germany', city: 'Munich', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Science','IT','Business'], offerLetter: 'Conditional Offer', ranking: 'QS Top 30', tuition: '$0–$3K/yr' },
  { name: 'LMU Munich', short: 'LMU', country: 'Germany', city: 'Munich', levels: ['Bachelor','Masters','PhD'], tags: ['Medicine','Law','Business','Science'], offerLetter: 'Conditional Offer', ranking: 'QS Top 60', tuition: '$0–$3K/yr' },
  { name: 'Heidelberg University', short: 'Heidelberg', country: 'Germany', city: 'Heidelberg', levels: ['Bachelor','Masters','PhD'], tags: ['Medicine','Science','Humanities','Law'], offerLetter: 'Conditional Offer', ranking: 'QS Top 100', tuition: '$0–$3K/yr' },
  { name: 'RWTH Aachen University', short: 'RWTH', country: 'Germany', city: 'Aachen', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Science','IT','Architecture'], offerLetter: 'Conditional Offer', ranking: 'QS Top 100', tuition: '$0–$3K/yr' },
  { name: 'University of Freiburg', short: 'Freiburg', country: 'Germany', city: 'Freiburg', levels: ['Bachelor','Masters','PhD'], tags: ['Medicine','Science','Humanities','Engineering'], offerLetter: 'Conditional Offer', ranking: 'QS Top 200', tuition: '$0–$3K/yr' },
  { name: 'University of Stuttgart', short: 'Stuttgart', country: 'Germany', city: 'Stuttgart', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Architecture','IT','Science'], offerLetter: 'Conditional Offer', ranking: 'QS Top 300', tuition: '$0–$3K/yr' },

  // ── NETHERLANDS ───────────────────────────────────────────────────────────
  { name: 'Delft University of Technology', short: 'TU Delft', country: 'Netherlands', city: 'Delft', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Architecture','IT','Science'], offerLetter: 'Conditional Offer', ranking: 'QS Top 50', tuition: '$10K–$18K/yr' },
  { name: 'University of Amsterdam', short: 'UvA', country: 'Netherlands', city: 'Amsterdam', levels: ['Bachelor','Masters','PhD'], tags: ['Business','Law','Science','Arts'], offerLetter: 'Conditional Offer', ranking: 'QS Top 60', tuition: '$10K–$18K/yr' },
  { name: 'Utrecht University', short: 'UU', country: 'Netherlands', city: 'Utrecht', levels: ['Bachelor','Masters','PhD'], tags: ['Medicine','Science','Law','Social Sciences'], offerLetter: 'Conditional Offer', ranking: 'QS Top 100', tuition: '$10K–$18K/yr' },
  { name: 'Eindhoven University of Technology', short: 'TU/e', country: 'Netherlands', city: 'Eindhoven', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','IT','Science','Business'], offerLetter: 'Conditional Offer', ranking: 'QS Top 150', tuition: '$10K–$18K/yr' },
  { name: 'Leiden University', short: 'Leiden', country: 'Netherlands', city: 'Leiden', levels: ['Bachelor','Masters','PhD'], tags: ['Law','Medicine','Science','Arts'], offerLetter: 'Conditional Offer', ranking: 'QS Top 150', tuition: '$10K–$18K/yr' },
  { name: 'Maastricht University', short: 'UM NL', country: 'Netherlands', city: 'Maastricht', levels: ['Bachelor','Masters','PhD'], tags: ['Business','Law','Medicine','Science'], offerLetter: 'Conditional Offer', ranking: 'QS Top 250', tuition: '$10K–$18K/yr' },

  // ── CANADA ────────────────────────────────────────────────────────────────
  { name: 'University of Toronto', short: 'UofT', country: 'Canada', city: 'Toronto', levels: ['Bachelor','Masters','PhD'], tags: ['Computer Science','Medicine','Business','Engineering'], offerLetter: 'Conditional Offer', ranking: 'QS Top 25', tuition: '$20K–$35K/yr' },
  { name: 'University of British Columbia', short: 'UBC', country: 'Canada', city: 'Vancouver', levels: ['Bachelor','Masters','PhD'], tags: ['Business','Engineering','Science','Arts'], offerLetter: 'Conditional Offer', ranking: 'QS Top 45', tuition: '$18K–$32K/yr' },
  { name: 'McGill University', short: 'McGill', country: 'Canada', city: 'Montreal', levels: ['Bachelor','Masters','PhD'], tags: ['Medicine','Law','Engineering','Science'], offerLetter: 'Conditional Offer', ranking: 'QS Top 35', tuition: '$15K–$28K/yr' },
  { name: 'University of Alberta', short: 'UAlberta', country: 'Canada', city: 'Edmonton', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Business','Science','Law'], offerLetter: 'Conditional Offer', ranking: 'QS Top 120', tuition: '$18K–$30K/yr' },
  { name: 'University of Waterloo', short: 'UWaterloo', country: 'Canada', city: 'Waterloo', levels: ['Bachelor','Masters','PhD'], tags: ['IT','Engineering','Business','Mathematics'], offerLetter: 'Conditional Offer', ranking: 'QS Top 150', tuition: '$18K–$30K/yr' },
  { name: 'York University', short: 'YorkU', country: 'Canada', city: 'Toronto', levels: ['Bachelor','Masters','PhD'], tags: ['Business','Law','Arts','Science'], offerLetter: 'Conditional Offer', ranking: 'QS Top 400', tuition: '$16K–$26K/yr' },
  { name: 'Toronto Metropolitan University', short: 'TMU', country: 'Canada', city: 'Toronto', levels: ['Bachelor','Masters'], tags: ['Business','Engineering','Media','IT'], offerLetter: 'Conditional Offer', ranking: '', tuition: '$15K–$25K/yr' },
  { name: 'University Canada West', short: 'UCW', country: 'Canada', city: 'Vancouver', levels: ['Bachelor','Masters'], tags: ['Business','IT','Management','Commerce'], offerLetter: 'Free Offer Letter', ranking: '', tuition: '$12K–$20K/yr' },
  { name: 'Cape Breton University', short: 'CBU', country: 'Canada', city: 'Sydney, NS', levels: ['Bachelor','Masters'], tags: ['Business','IT','Engineering','Hospitality'], offerLetter: 'Free Offer Letter', ranking: '', tuition: '$10K–$18K/yr' },

  // ── USA ───────────────────────────────────────────────────────────────────
  { name: 'Harvard University', short: 'Harvard', country: 'USA', city: 'Cambridge, MA', levels: ['Bachelor','Masters','PhD'], tags: ['Law','Medicine','Business','Science'], offerLetter: 'Conditional Offer', ranking: 'QS #4', tuition: '$50K–$60K/yr' },
  { name: 'Stanford University', short: 'Stanford', country: 'USA', city: 'Stanford, CA', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Business','Science','Law'], offerLetter: 'Conditional Offer', ranking: 'QS #5', tuition: '$55K–$65K/yr' },
  { name: 'MIT', short: 'MIT', country: 'USA', city: 'Cambridge, MA', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Science','IT','Architecture'], offerLetter: 'Conditional Offer', ranking: 'QS #1', tuition: '$55K–$60K/yr' },
  { name: 'UC Berkeley', short: 'UCB', country: 'USA', city: 'Berkeley, CA', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Science','Business','Law'], offerLetter: 'Conditional Offer', ranking: 'QS Top 10', tuition: '$30K–$45K/yr' },
  { name: 'University of Texas at Austin', short: 'UT Austin', country: 'USA', city: 'Austin, TX', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Business','Law','Media'], offerLetter: 'Conditional Offer', ranking: 'QS Top 100', tuition: '$20K–$38K/yr' },
  { name: 'Arizona State University', short: 'ASU', country: 'USA', city: 'Tempe, AZ', levels: ['Bachelor','Masters','PhD'], tags: ['Business','Engineering','IT','Media'], offerLetter: 'Free Offer Letter', ranking: 'QS Top 250', tuition: '$22K–$35K/yr' },
  { name: 'University of South Florida', short: 'USF', country: 'USA', city: 'Tampa, FL', levels: ['Bachelor','Masters','PhD'], tags: ['Business','Engineering','Medicine','IT'], offerLetter: 'Free Offer Letter', ranking: 'QS Top 400', tuition: '$17K–$28K/yr' },
  { name: 'Pace University', short: 'Pace', country: 'USA', city: 'New York, NY', levels: ['Bachelor','Masters'], tags: ['Business','Law','IT','Arts'], offerLetter: 'Free Offer Letter', ranking: '', tuition: '$35K–$45K/yr' },

  // ── AUSTRALIA ─────────────────────────────────────────────────────────────
  { name: 'University of Melbourne', short: 'UMelb', country: 'Australia', city: 'Melbourne', levels: ['Bachelor','Masters','PhD'], tags: ['Medicine','Law','Business','Science'], offerLetter: 'Conditional Offer', ranking: 'QS Top 35', tuition: '$25K–$40K/yr' },
  { name: 'Australian National University', short: 'ANU', country: 'Australia', city: 'Canberra', levels: ['Bachelor','Masters','PhD'], tags: ['Politics','Science','Law','Arts'], offerLetter: 'Conditional Offer', ranking: 'QS Top 30', tuition: '$25K–$38K/yr' },
  { name: 'University of Sydney', short: 'USYD', country: 'Australia', city: 'Sydney', levels: ['Bachelor','Masters','PhD'], tags: ['Medicine','Law','Business','Engineering'], offerLetter: 'Conditional Offer', ranking: 'QS Top 40', tuition: '$25K–$40K/yr' },
  { name: 'UNSW Sydney', short: 'UNSW', country: 'Australia', city: 'Sydney', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Business','Law','IT'], offerLetter: 'Conditional Offer', ranking: 'QS Top 20', tuition: '$25K–$40K/yr' },
  { name: 'University of Queensland', short: 'UQ', country: 'Australia', city: 'Brisbane', levels: ['Bachelor','Masters','PhD'], tags: ['Medicine','Engineering','Business','Science'], offerLetter: 'Conditional Offer', ranking: 'QS Top 50', tuition: '$22K–$38K/yr' },
  { name: 'Monash University', short: 'Monash', country: 'Australia', city: 'Melbourne', levels: ['Bachelor','Masters','PhD'], tags: ['Business','Engineering','Medicine','IT'], offerLetter: 'Conditional Offer', ranking: 'QS Top 60', tuition: '$22K–$38K/yr' },
  { name: 'University of Western Australia', short: 'UWA', country: 'Australia', city: 'Perth', levels: ['Bachelor','Masters','PhD'], tags: ['Science','Engineering','Business','Law'], offerLetter: 'Conditional Offer', ranking: 'QS Top 100', tuition: '$20K–$35K/yr' },
  { name: 'University of Adelaide', short: 'Adelaide', country: 'Australia', city: 'Adelaide', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Science','Business','Medicine'], offerLetter: 'Conditional Offer', ranking: 'QS Top 100', tuition: '$20K–$35K/yr' },
  { name: 'University of Technology Sydney', short: 'UTS', country: 'Australia', city: 'Sydney', levels: ['Bachelor','Masters','PhD'], tags: ['Business','IT','Engineering','Design'], offerLetter: 'Conditional Offer', ranking: 'QS Top 150', tuition: '$20K–$35K/yr' },
  { name: 'RMIT University', short: 'RMIT', country: 'Australia', city: 'Melbourne', levels: ['Bachelor','Masters','PhD'], tags: ['Business','IT','Design','Engineering'], offerLetter: 'Conditional Offer', ranking: 'QS Top 200', tuition: '$20K–$35K/yr' },
  { name: 'Deakin University', short: 'Deakin', country: 'Australia', city: 'Melbourne', levels: ['Bachelor','Masters','PhD'], tags: ['Business','IT','Health Sciences','Education'], offerLetter: 'Conditional Offer', ranking: 'QS Top 250', tuition: '$18K–$30K/yr' },
  { name: 'La Trobe University', short: 'LaTrobe', country: 'Australia', city: 'Melbourne', levels: ['Bachelor','Masters'], tags: ['Business','Health Sciences','IT','Education'], offerLetter: 'Conditional Offer', ranking: '', tuition: '$16K–$28K/yr' },
  { name: 'Western Sydney University', short: 'WSU', country: 'Australia', city: 'Sydney', levels: ['Bachelor','Masters','PhD'], tags: ['Business','IT','Engineering','Health Sciences'], offerLetter: 'Free Offer Letter', ranking: '', tuition: '$14K–$25K/yr' },
  { name: 'Griffith University', short: 'Griffith', country: 'Australia', city: 'Brisbane / Gold Coast', levels: ['Bachelor','Masters'], tags: ['Business','Law','IT','Health Sciences'], offerLetter: 'Free Offer Letter', ranking: '', tuition: '$14K–$25K/yr' },
  { name: 'Curtin University', short: 'Curtin', country: 'Australia', city: 'Perth', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Business','IT','Science'], offerLetter: 'Conditional Offer', ranking: 'QS Top 250', tuition: '$18K–$30K/yr' },
  { name: 'University of Wollongong', short: 'UOW', country: 'Australia', city: 'Wollongong', levels: ['Bachelor','Masters','PhD'], tags: ['IT','Engineering','Business','Science'], offerLetter: 'Conditional Offer', ranking: 'QS Top 200', tuition: '$18K–$30K/yr' },
  { name: 'Macquarie University', short: 'MQU', country: 'Australia', city: 'Sydney', levels: ['Bachelor','Masters','PhD'], tags: ['Business','Finance','IT','Science'], offerLetter: 'Conditional Offer', ranking: 'QS Top 200', tuition: '$20K–$32K/yr' },
  { name: 'University of Newcastle', short: 'UoN AU', country: 'Australia', city: 'Newcastle', levels: ['Bachelor','Masters','PhD'], tags: ['Medicine','Engineering','Business','Science'], offerLetter: 'Free Offer Letter', ranking: '', tuition: '$16K–$26K/yr' },
  { name: 'Charles Darwin University', short: 'CDU', country: 'Australia', city: 'Darwin', levels: ['Bachelor','Masters'], tags: ['Business','IT','Health Sciences','Education'], offerLetter: 'Free Offer Letter', ranking: '', tuition: '$12K–$22K/yr' },
  { name: 'Torrens University Australia', short: 'Torrens', country: 'Australia', city: 'Sydney / Melbourne', levels: ['Diploma','Bachelor','Masters'], tags: ['Business','IT','Design','Hospitality'], offerLetter: 'Free Offer Letter', ranking: '', tuition: '$12K–$22K/yr' },

  // ── NEW ZEALAND ───────────────────────────────────────────────────────────
  { name: 'University of Auckland', short: 'UoA', country: 'New Zealand', city: 'Auckland', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Business','Medicine','Law'], offerLetter: 'Conditional Offer', ranking: 'QS Top 70', tuition: '$20K–$35K/yr' },
  { name: 'University of Otago', short: 'Otago', country: 'New Zealand', city: 'Dunedin', levels: ['Bachelor','Masters','PhD'], tags: ['Medicine','Science','Business','Law'], offerLetter: 'Conditional Offer', ranking: 'QS Top 200', tuition: '$18K–$30K/yr' },
  { name: 'Victoria University of Wellington', short: 'VUW', country: 'New Zealand', city: 'Wellington', levels: ['Bachelor','Masters','PhD'], tags: ['Law','Business','Arts','Science'], offerLetter: 'Conditional Offer', ranking: 'QS Top 250', tuition: '$18K–$30K/yr' },
  { name: 'University of Canterbury', short: 'UC', country: 'New Zealand', city: 'Christchurch', levels: ['Bachelor','Masters','PhD'], tags: ['Engineering','Science','Arts','Business'], offerLetter: 'Conditional Offer', ranking: 'QS Top 300', tuition: '$18K–$28K/yr' },
  { name: 'Massey University', short: 'Massey', country: 'New Zealand', city: 'Palmerston North', levels: ['Bachelor','Masters','PhD'], tags: ['Agriculture','Business','Design','Science'], offerLetter: 'Conditional Offer', ranking: 'QS Top 400', tuition: '$16K–$28K/yr' },
];

const LEVELS = ['Diploma','Bachelor','Masters','PhD','Foundation','Certificate','Advance Diploma'];
const LOCATIONS = ['All Locations','Malaysia','Japan','Singapore','South Korea','China','UK','Germany','Netherlands','Canada','USA','Australia','New Zealand'];
const OFFER_TYPES = ['Free Offer Letter','Conditional Offer'];

export default function UniversitiesPage() {
  const [search, setSearch] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [location, setLocation] = useState('All Locations');
  const [selectedOfferTypes, setSelectedOfferTypes] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleLevel = (l: string) => setSelectedLevels(p => p.includes(l) ? p.filter(x => x !== l) : [...p, l]);
  const toggleOffer = (o: string) => setSelectedOfferTypes(p => p.includes(o) ? p.filter(x => x !== o) : [...p, o]);
  const clearAll = () => { setSearch(''); setSelectedLevels([]); setLocation('All Locations'); setSelectedOfferTypes([]); };

  const filtered = useMemo(() => universities.filter(u => {
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.city.toLowerCase().includes(search.toLowerCase()) && !u.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) return false;
    if (location !== 'All Locations' && u.country !== location) return false;
    if (selectedLevels.length > 0 && !selectedLevels.some(l => u.levels.includes(l))) return false;
    if (selectedOfferTypes.length > 0 && !selectedOfferTypes.includes(u.offerLetter)) return false;
    return true;
  }), [search, location, selectedLevels, selectedOfferTypes]);

  const activeFilterCount = selectedLevels.length + selectedOfferTypes.length + (location !== 'All Locations' ? 1 : 0);

  const SidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--blue)', margin: 0 }}>Filter Your Best Search</h2>
        {activeFilterCount > 0 && <button onClick={clearAll} style={{ fontSize: '0.75rem', color: 'var(--orange)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Clear All ({activeFilterCount})</button>}
      </div>
      <div>
        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '8px' }}>Search By Name</label>
        <input type="text" placeholder="Type University Name" value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: '8px', fontSize: '0.85rem', fontFamily: 'var(--font-body)', outline: 'none', boxSizing: 'border-box', color: 'var(--text)' }}
          onFocus={e => e.currentTarget.style.borderColor = 'var(--blue)'}
          onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'} />
      </div>
      <div>
        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '12px' }}>Level Of Interest</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {LEVELS.map(l => (
            <label key={l} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.87rem', color: selectedLevels.includes(l) ? 'var(--blue)' : 'var(--text)', fontWeight: selectedLevels.includes(l) ? 700 : 400, userSelect: 'none', transition: 'color 0.2s' }}>
              <input type="checkbox" checked={selectedLevels.includes(l)} onChange={() => toggleLevel(l)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--blue)', cursor: 'pointer', flexShrink: 0 }} />
              {l}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '8px' }}>Search By Location</label>
        <div style={{ position: 'relative' }}>
          <select value={location} onChange={e => setLocation(e.target.value)}
            style={{ width: '100%', padding: '10px 36px 10px 14px', border: '1.5px solid var(--border)', borderRadius: '8px', fontSize: '0.85rem', fontFamily: 'var(--font-body)', appearance: 'none', outline: 'none', cursor: 'pointer', color: 'var(--text)', background: '#fff', boxSizing: 'border-box' }}>
            {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--gray)', fontSize: '0.7rem' }}>▼</span>
        </div>
      </div>
      <div>
        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '12px' }}>Offer Letter Type</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {OFFER_TYPES.map(o => (
            <label key={o} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.87rem', color: selectedOfferTypes.includes(o) ? 'var(--blue)' : 'var(--text)', fontWeight: selectedOfferTypes.includes(o) ? 700 : 400, userSelect: 'none', transition: 'color 0.2s' }}>
              <input type="checkbox" checked={selectedOfferTypes.includes(o)} onChange={() => toggleOffer(o)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--blue)', cursor: 'pointer', flexShrink: 0 }} />
              {o}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        .uni-page-layout { display: grid; grid-template-columns: 280px 1fr; gap: 32px; align-items: start; }
        .uni-sidebar { background: #fff; border: 1.5px solid var(--border); border-radius: 16px; padding: 28px 24px; position: sticky; top: 90px; max-height: calc(100vh - 110px); overflow-y: auto; }
        .uni-main-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1.5px solid var(--border); }
        .uni-grid-new { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 18px; }
        .uni-card-new { background: #fff; border: 1.5px solid var(--border); border-radius: 14px; padding: 22px; transition: all 0.3s ease; cursor: default; }
        .uni-card-new:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(11,61,145,0.12); border-color: var(--blue); }
        .uni-logo-new { width: 46px; height: 46px; background: linear-gradient(135deg, var(--blue), var(--blue-mid)); border-radius: 11px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 900; color: #fff; font-family: var(--font-display); flex-shrink: 0; }
        .mobile-filter-btn { display: none; align-items: center; gap: 8px; background: var(--blue); color: #fff; border: none; border-radius: 10px; padding: 10px 18px; font-weight: 700; font-size: 0.85rem; cursor: pointer; font-family: var(--font-body); margin-bottom: 20px; }
        .mob-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000; }
        .mob-drawer { position: fixed; left: 0; top: 0; bottom: 0; width: 300px; background: #fff; z-index: 1001; padding: 24px; overflow-y: auto; box-shadow: 4px 0 40px rgba(0,0,0,0.15); }
        @media (max-width: 900px) {
          .uni-page-layout { grid-template-columns: 1fr; }
          .uni-sidebar { display: none; }
          .mobile-filter-btn { display: flex; }
          .mob-overlay.open { display: block; }
        }
      `}</style>

      <div className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-tag">Partner Institutions</div>
          <h1>Our Partner Universities</h1>
          <p>Browse {universities.length}+ universities across 12 countries — filter by level, location, and offer type to find your perfect fit.</p>
        </div>
      </div>

      <section style={{ background: 'var(--off)', padding: '48px 0 64px' }}>
        <div className="container">
          <button className="mobile-filter-btn" onClick={() => setSidebarOpen(true)}>
            ⚙️ Filter {activeFilterCount > 0 && `(${activeFilterCount} active)`}
          </button>

          <div className={`mob-overlay${sidebarOpen ? ' open' : ''}`} onClick={() => setSidebarOpen(false)}>
            <div className="mob-drawer" onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--blue)' }}>Filters</span>
                <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--gray)', lineHeight: 1 }}>×</button>
              </div>
              <SidebarContent />
            </div>
          </div>

          <div className="uni-page-layout">
            <div className="uni-sidebar"><SidebarContent /></div>
            <div>
              <div className="uni-main-header">
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--blue)', margin: 0 }}>University List</h2>
                <span style={{ background: 'var(--off)', border: '1.5px solid var(--border)', borderRadius: '20px', padding: '5px 14px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--gray)' }}>
                  {filtered.length} {filtered.length === 1 ? 'university' : 'universities'}
                </span>
              </div>

              {filtered.length > 0 ? (
                <div className="uni-grid-new">
                  {filtered.map((u, i) => {
                    const badge = u.offerLetter === 'Free Offer Letter'
                      ? { bg: '#dcfce7', color: '#16a34a' }
                      : { bg: '#dbeafe', color: '#2563eb' };
                    return (
                      <div key={i} className="uni-card-new">
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <div className="uni-logo-new">{u.short.slice(0, 4)}</div>
                          {u.ranking && <span style={{ fontSize: '0.63rem', background: 'var(--blue-light)', color: 'var(--blue)', borderRadius: '20px', padding: '3px 9px', fontWeight: 700 }}>{u.ranking}</span>}
                        </div>
                        <span style={{ display: 'inline-block', fontSize: '0.63rem', fontWeight: 700, padding: '3px 9px', borderRadius: '20px', marginBottom: '8px', background: badge.bg, color: badge.color }}>{u.offerLetter}</span>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--blue)', margin: '0 0 4px' }}>{u.name}</h3>
                        <p style={{ fontSize: '0.77rem', color: 'var(--gray)', margin: '0 0 6px' }}>📍 {u.city}, {u.country}</p>
                        {u.tuition && <p style={{ fontSize: '0.73rem', color: 'var(--orange)', fontWeight: 700, margin: '0 0 10px' }}>💰 {u.tuition}</p>}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                          {u.levels.map(l => <span key={l} style={{ fontSize: '0.65rem', fontWeight: 600, background: '#fff3e0', color: '#e65100', padding: '2px 8px', borderRadius: '100px' }}>{l}</span>)}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {u.tags.map(t => <span key={t} style={{ fontSize: '0.65rem', background: 'var(--off)', border: '1px solid var(--border)', borderRadius: '6px', padding: '2px 7px', color: 'var(--gray)' }}>{t}</span>)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
                  <h3 style={{ color: 'var(--blue)', marginBottom: '8px' }}>No universities found</h3>
                  <p style={{ color: 'var(--gray)', marginBottom: '20px' }}>Try adjusting your filters or search term.</p>
                  <button onClick={clearAll} style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>Clear All Filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="cta-band">
        <div className="container">
          <h2>Can't Find What You're Looking For?</h2>
          <p>We have connections to universities worldwide. Contact us for personalized recommendations.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn-white">📞 Ask Our Experts</Link>
          </div>
        </div>
      </div>
    </>
  );
}
