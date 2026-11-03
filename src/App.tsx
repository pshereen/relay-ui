import { useEffect, useState } from 'react'
import { ArrowRight, Box, Check, ChevronDown, Code2, Command, Copy, GitFork, Menu, Moon, Palette, Search, Sparkles, Sun, X } from 'lucide-react'
import { Button } from './components/Button'
import './App.css'

const navigation = [
  { label: 'Foundations', items: ['Colors', 'Typography', 'Spacing', 'Icons'] },
  { label: 'Components', items: ['Button', 'Input', 'Select', 'Dialog'] },
]

const codeExample = `import { Button } from '@relay-ui/react'

export function SaveAction() {
  return <Button variant="primary">Save changes</Button>
}`

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedSize, setSelectedSize] = useState('Medium')

  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])

  const copyCode = async () => {
    await navigator.clipboard?.writeText(codeExample)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="app-shell" id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Relay UI home"><span className="brand-mark"><Command size={19} /></span><span>Relay <strong>UI</strong></span></a>
        <nav className="topnav" aria-label="Primary navigation"><a className="active" href="#docs">Docs</a><a href="#components">Components</a><a href="#foundations">Foundations</a></nav>
        <div className="header-actions">
          <button className="search-trigger" type="button" aria-label="Search documentation"><Search size={16} /><span>Search docs...</span><kbd>⌘ K</kbd></button>
          <a className="icon-button desktop-only" href="https://github.com/pshereen/relay-ui" aria-label="Relay UI on GitHub"><GitFork size={19} /></a>
          <button className="icon-button desktop-only" type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button>
          <button className="icon-button mobile-menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label="Toggle navigation">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>

      {menuOpen && <nav className="mobile-navigation" id="mobile-navigation" aria-label="Mobile navigation"><a href="#docs" onClick={() => setMenuOpen(false)}>Documentation</a><a href="#components" onClick={() => setMenuOpen(false)}>Components</a><a href="#foundations" onClick={() => setMenuOpen(false)}>Foundations</a></nav>}

      <aside className="sidebar" aria-label="Documentation">
        <a className="sidebar-item selected" href="#introduction"><Sparkles size={16} /> Introduction</a>
        <a className="sidebar-item" href="#getting-started"><Code2 size={16} /> Getting started</a>
        {navigation.map((group) => <div className="nav-group" key={group.label}><p>{group.label}</p>{group.items.map((item) => <a href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}</div>)}
        <div className="sidebar-note"><span><Sparkles size={15} /> AI-ready</span><p>Components include machine-readable schemas for safe interface composition.</p></div>
      </aside>

      <main id="main-content">
        <section className="hero" id="introduction">
          <div className="eyebrow"><span>v0.1.0</span> Now in public preview <ArrowRight size={14} /></div>
          <h1>Interfaces that feel<br /><em>effortlessly clear.</em></h1>
          <p className="hero-copy">An accessible React design system for building thoughtful products at speed—crafted for people and ready for AI.</p>
          <div className="hero-actions"><Button trailingIcon={<ArrowRight size={16} />}>Get started</Button><Button variant="secondary" leadingIcon={<Box size={16} />}>Browse components</Button></div>
          <div className="install-command"><code>npm install @relay-ui/react</code><button type="button" onClick={() => navigator.clipboard?.writeText('npm install @relay-ui/react')} aria-label="Copy install command"><Copy size={16} /></button></div>
        </section>

        <section className="principles" id="foundations" aria-label="Design system principles">
          <article><span><Palette size={18} /></span><h2>Purposeful by default</h2><p>Every decision starts with clarity, consistency, and the people using the interface.</p></article>
          <article><span><Check size={18} /></span><h2>Accessible throughout</h2><p>Keyboard support, clear focus, and semantic markup are part of every component.</p></article>
          <article><span><Sparkles size={18} /></span><h2>Ready for what’s next</h2><p>Typed APIs and constrained schemas make components safe for AI-assisted workflows.</p></article>
        </section>

        <section className="showcase-section" id="components">
          <div className="section-heading"><div><p className="kicker">Component preview</p><h2>One component. Every state.</h2></div><p>Flexible enough for many product contexts, predictable enough to feel familiar.</p></div>
          <div className="component-workbench">
            <div className="preview-pane"><div className="preview-label">Preview</div><div className="button-preview"><Button size={selectedSize.toLowerCase() as 'small' | 'medium' | 'large'}>Continue</Button><Button size={selectedSize.toLowerCase() as 'small' | 'medium' | 'large'} variant="secondary">Learn more</Button><Button size={selectedSize.toLowerCase() as 'small' | 'medium' | 'large'} variant="ghost">Not now</Button></div></div>
            <div className="controls-pane">
              <div className="control-row"><span>Size</span><div className="segmented-control" aria-label="Button size">{['Small', 'Medium', 'Large'].map((size) => <button type="button" className={selectedSize === size ? 'selected' : ''} aria-pressed={selectedSize === size} onClick={() => setSelectedSize(size)} key={size}>{size}</button>)}</div></div>
              <div className="control-row"><span>State</span><button className="select-control" type="button">Default <ChevronDown size={15} /></button></div>
            </div>
          </div>
        </section>

        <section className="code-section" id="getting-started">
          <div><p className="kicker">Built for developers</p><h2>Simple API.<br />Strong foundations.</h2><p>Composable, typed, and documented components that are easy to adopt and hard to misuse.</p><a href="#docs">Read the documentation <ArrowRight size={15} /></a></div>
          <div className="code-card"><div className="code-header"><span><i></i><i></i><i></i></span><button type="button" onClick={copyCode}>{copied ? <Check size={15} /> : <Copy size={15} />} {copied ? 'Copied' : 'Copy'}</button></div><pre><code><span className="code-purple">import</span> {'{ Button }'} <span className="code-purple">from</span> <span className="code-green">'@relay-ui/react'</span>{'\n\n'}<span className="code-purple">export function</span> <span className="code-blue">SaveAction</span>() {'{\n  '}<span className="code-purple">return</span> {'<'}<span className="code-blue">Button</span> <span className="code-gold">variant</span>=<span className="code-green">"primary"</span>{'>'}Save changes{'</'}<span className="code-blue">Button</span>{'>\n}'}</code></pre></div>
        </section>
      </main>

      <footer><a className="brand" href="#top"><span className="brand-mark"><Command size={17} /></span> Relay <strong>UI</strong></a><p>Designed and built with care.</p><p>React · TypeScript · Accessible</p></footer>
    </div>
  )
}

export default App
