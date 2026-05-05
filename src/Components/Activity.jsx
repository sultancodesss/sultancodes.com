import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaProjectDiagram, FaClock, FaFire, FaReact, FaJs, FaCss3Alt, FaHtml5, FaNodeJs, FaGitAlt, FaFigma, FaPython } from 'react-icons/fa';
import './Activity.css';

/* ── helper: generate random heatmap data ── */
function generateHeatmap() {
    const weeks = 20;
    const data = [];
    for (let w = 0; w < weeks; w++) {
        const week = [];
        for (let d = 0; d < 7; d++) {
            week.push(Math.floor(Math.random() * 5)); // 0-4 intensity
        }
        data.push(week);
    }
    return data;
}

const projects = [
    { title: 'Portfolio Website', tech: 'React + 3D', date: 'May 2026', desc: 'Personal portfolio with 3D WebGL animations and responsive design', color: '#8a2be2' },
    { title: 'E-Commerce Dashboard', tech: 'Next.js', date: 'Apr 2026', desc: 'Full-stack dashboard with real-time analytics and modern UI', color: '#ff1493' },
    { title: 'Chat Application', tech: 'React + Socket.io', date: 'Mar 2026', desc: 'Real-time messaging app with typing indicators and media sharing', color: '#00bfff' },
    { title: 'Weather App', tech: 'JavaScript + API', date: 'Feb 2026', desc: 'Beautiful weather app with animated forecasts and location detection', color: '#ffd700' },
];

const skills = [
    { name: 'React', icon: <FaReact />, level: 90, color: '#61dafb' },
    { name: 'JavaScript', icon: <FaJs />, level: 85, color: '#f7df1e' },
    { name: 'CSS3', icon: <FaCss3Alt />, level: 88, color: '#264de4' },
    { name: 'HTML5', icon: <FaHtml5 />, level: 95, color: '#e34c26' },
    { name: 'Node.js', icon: <FaNodeJs />, level: 70, color: '#68a063' },
    { name: 'Git', icon: <FaGitAlt />, level: 80, color: '#f05032' },
    { name: 'Figma', icon: <FaFigma />, level: 75, color: '#a259ff' },
    { name: 'Python', icon: <FaPython />, level: 65, color: '#3776ab' },
];

const stats = [
    { icon: <FaCode />, value: '2,400+', label: 'Lines of Code', color: '#8a2be2' },
    { icon: <FaProjectDiagram />, value: '10+', label: 'Projects Done', color: '#ff1493' },
    { icon: <FaClock />, value: '500+', label: 'Hours Coded', color: '#00bfff' },
    { icon: <FaFire />, value: '30', label: 'Day Streak', color: '#ffd700' },
];

const dayLabels = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun'];
const intensityColors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];

/* ── Animated counter ── */
function Counter({ target }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
        const num = parseInt(target.replace(/[^0-9]/g, ''), 10);
        if (isNaN(num)) return;
        let start = 0;
        const duration = 2000;
        const step = Math.max(1, Math.floor(num / (duration / 16)));
        const id = setInterval(() => {
            start += step;
            if (start >= num) { setCount(num); clearInterval(id); }
            else setCount(start);
        }, 16);
        return () => clearInterval(id);
    }, [target]);
    const suffix = target.replace(/[0-9,]/g, '');
    return <span>{count.toLocaleString()}{suffix}</span>;
}

/* ── Heatmap Tooltip Cell ── */
function HeatCell({ intensity, week, day }) {
    const contribs = intensity * 2;
    return (
        <div
            className="heat-cell"
            style={{ backgroundColor: intensityColors[intensity] }}
            title={`${contribs} contributions`}
        />
    );
}

function Activity() {
    const heatmap = useMemo(() => generateHeatmap(), []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    return (
        <motion.div className="activity-page" id="activity-section" initial="hidden" animate="visible" variants={containerVariants}>
            {/* ── Page Header ── */}
            <motion.div className="activity-header" variants={itemVariants}>
                <h1>My <span className="gradient-text">Activity</span></h1>
                <p>Track my coding journey, projects, and skill growth</p>
            </motion.div>

            {/* ── Stats Dashboard ── */}
            <motion.div className="stats-grid" variants={itemVariants}>
                {stats.map((s, i) => (
                    <motion.div
                        className="stat-card"
                        key={i}
                        whileHover={{ scale: 1.05, rotateY: 8 }}
                        style={{ '--accent': s.color }}
                    >
                        <div className="stat-icon">{s.icon}</div>
                        <h2><Counter target={s.value} /></h2>
                        <p>{s.label}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* ── Contribution Heatmap ── */}
            <motion.div className="heatmap-section" variants={itemVariants}>
                <h2>Contribution Activity</h2>
                <div className="heatmap-wrapper">
                    <div className="heatmap-labels">
                        {dayLabels.map((d, i) => <span key={i}>{d}</span>)}
                    </div>
                    <div className="heatmap-grid">
                        {heatmap.map((week, wi) => (
                            <div className="heatmap-col" key={wi}>
                                {week.map((val, di) => (
                                    <HeatCell key={di} intensity={val} week={wi} day={di} />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="heatmap-legend">
                    <span>Less</span>
                    {intensityColors.map((c, i) => (
                        <div key={i} className="legend-cell" style={{ backgroundColor: c }} />
                    ))}
                    <span>More</span>
                </div>
            </motion.div>

            {/* ── Skills Progress ── */}
            <motion.div className="skills-section" variants={itemVariants}>
                <h2>Skills & Technologies</h2>
                <div className="skills-grid">
                    {skills.map((skill, i) => (
                        <motion.div
                            className="skill-card"
                            key={i}
                            whileHover={{ scale: 1.04, rotateX: 5 }}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                        >
                            <div className="skill-header">
                                <span className="skill-icon" style={{ color: skill.color }}>{skill.icon}</span>
                                <span className="skill-name">{skill.name}</span>
                                <span className="skill-percent">{skill.level}%</span>
                            </div>
                            <div className="skill-bar-bg">
                                <motion.div
                                    className="skill-bar-fill"
                                    style={{ backgroundColor: skill.color }}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, delay: i * 0.08, ease: 'easeOut' }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* ── Recent Projects Timeline ── */}
            <motion.div className="timeline-section" variants={itemVariants}>
                <h2>Recent Projects</h2>
                <div className="timeline">
                    {projects.map((proj, i) => (
                        <motion.div
                            className="timeline-item"
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                        >
                            <div className="timeline-dot" style={{ backgroundColor: proj.color }} />
                            <motion.div
                                className="timeline-card"
                                whileHover={{ scale: 1.03, rotateY: 5 }}
                                style={{ '--card-accent': proj.color }}
                            >
                                <div className="timeline-date">{proj.date}</div>
                                <h3>{proj.title}</h3>
                                <span className="timeline-tech">{proj.tech}</span>
                                <p>{proj.desc}</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

/* memo helper for heatmap data */
function useMemo(fn, deps) {
    const ref = useRef();
    if (!ref.current) ref.current = fn();
    return ref.current;
}

export default Activity;
