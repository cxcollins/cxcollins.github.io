import { useEffect, useState } from 'react'
import './ThemeSwitcher.css'

const THEME_GROUPS = [
    {
        label: 'Light',
        themes: [
            { id: 'classic', label: 'Classic' },
            { id: 'ocean', label: 'Ocean' },
            { id: 'cedar', label: 'Cedar' },
        ],
    },
    {
        label: 'Midnight',
        themes: [
            { id: 'midnight', label: 'Midnight' },
            { id: 'midnight-violet', label: 'Midnight Violet' },
            { id: 'midnight-teal', label: 'Midnight Teal' },
        ],
    },
    {
        label: 'Midnight · Gradient',
        themes: [
            { id: 'midnight-aurora', label: 'Aurora' },
            { id: 'midnight-sunset', label: 'Sunset' },
            { id: 'midnight-nebula', label: 'Nebula' },
        ],
    },
]

const ALL_THEMES = THEME_GROUPS.flatMap((g) => g.themes)
const STORAGE_KEY = 'site-theme'
const DEFAULT_THEME = 'midnight'

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState(DEFAULT_THEME)

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        const initial = ALL_THEMES.some((t) => t.id === saved) ? saved : DEFAULT_THEME
        document.documentElement.setAttribute('data-theme', initial)
        setTheme(initial)
    }, [])

    const handleChange = (e) => {
        const next = e.target.value
        document.documentElement.setAttribute('data-theme', next)
        localStorage.setItem(STORAGE_KEY, next)
        setTheme(next)
    }

    return (
        <label className='themeSwitcher'>
            <span className='themeSwitcherLabel'>Theme</span>
            <select
                className='themeSwitcherSelect'
                value={theme}
                onChange={handleChange}
                aria-label='Choose site color theme'
            >
                {THEME_GROUPS.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                        {group.themes.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.label}
                            </option>
                        ))}
                    </optgroup>
                ))}
            </select>
        </label>
    )
}
