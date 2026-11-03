import { useEffect, useState } from 'react'
import { ArrowRight, Box, Check, Code2, Command, Copy, GitFork, Menu, Moon, Palette, Plus, Search, Settings, Sparkles, Sun, X } from 'lucide-react'
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
  const [selectedState, setSelectedState] = useState<'default' | 'loading' | 'disabled'>('default')

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

        <section className="showcase-section" id="button">
          <div className="section-heading"><div><p className="kicker">Button component</p><h2>One component. Every state.</h2></div><p>Flexible enough for many product contexts, predictable enough to feel familiar.</p></div>
          <div className="component-workbench">
            <div className="preview-pane"><div className="preview-label">Interactive preview</div><div className="button-preview">
              <Button size={selectedSize.toLowerCase() as 'small' | 'medium' | 'large'} loading={selectedState === 'loading'} disabled={selectedState === 'disabled'}>{selectedState === 'loading' ? 'Continuing' : 'Continue'}</Button>
              <Button size={selectedSize.toLowerCase() as 'small' | 'medium' | 'large'} variant="secondary" loading={selectedState === 'loading'} disabled={selectedState === 'disabled'}>Learn more</Button>
              <Button size={selectedSize.toLowerCase() as 'small' | 'medium' | 'large'} variant="ghost" loading={selectedState === 'loading'} disabled={selectedState === 'disabled'}>Not now</Button>
            </div></div>
            <div className="controls-pane">
              <div className="control-row"><span>Size</span><div className="segmented-control" aria-label="Button size">{['Small', 'Medium', 'Large'].map((size) => <button type="button" className={selectedSize === size ? 'selected' : ''} aria-pressed={selectedSize === size} onClick={() => setSelectedSize(size)} key={size}>{size}</button>)}</div></div>
              <label className="control-row"><span>State</span><select className="select-control" value={selectedState} onChange={(event) => setSelectedState(event.target.value as typeof selectedState)}><option value="default">Default</option><option value="loading">Loading</option><option value="disabled">Disabled</option></select></label>
            </div>
          </div>
        </section>

        <section className="button-docs" id="components" aria-labelledby="button-docs-title">
          <div className="docs-intro"><p className="kicker">Component documentation</p><h2 id="button-docs-title">Button</h2><p>Buttons trigger an action or event. Use clear, action-oriented labels and reserve the primary treatment for the most important action in a group.</p></div>

          <div className="docs-block">
            <div className="docs-heading"><div><h3>Variants</h3><p>Choose emphasis based on the action’s importance.</p></div></div>
            <div className="example-card"><div className="example-preview"><Button>Primary action</Button><Button variant="secondary">Secondary action</Button><Button variant="ghost">Ghost action</Button></div><pre><code>{`<Button>Primary action</Button>\n<Button variant="secondary">Secondary action</Button>\n<Button variant="ghost">Ghost action</Button>`}</code></pre></div>
          </div>

          <div className="docs-grid">
            <div className="docs-block"><div className="docs-heading"><div><h3>Sizes</h3><p>Match density to the surrounding interface.</p></div></div><div className="example-card"><div className="example-preview align-center"><Button size="small">Small</Button><Button>Medium</Button><Button size="large">Large</Button></div></div></div>
            <div className="docs-block"><div className="docs-heading"><div><h3>Icons</h3><p>Icons reinforce meaning; icon-only buttons require a label.</p></div></div><div className="example-card"><div className="example-preview"><Button leadingIcon={<Plus size={16} />}>Add member</Button><Button iconOnly variant="secondary" aria-label="Open settings"><Settings size={17} /></Button></div></div></div>
          </div>

          <div className="docs-block">
            <div className="docs-heading"><div><h3>States</h3><p>Loading prevents duplicate actions; disabled communicates unavailable actions.</p></div></div>
            <div className="example-card"><div className="example-preview"><Button loading>Saving changes</Button><Button disabled>Unavailable</Button><Button variant="secondary" disabled>Unavailable</Button></div></div>
          </div>

          <div className="docs-block">
            <div className="docs-heading"><div><h3>Props</h3><p>Button extends native HTML button attributes.</p></div></div>
            <div className="props-table-wrap"><table className="props-table"><thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody>
              <tr><td><code>variant</code></td><td><code>'primary' | 'secondary' | 'ghost'</code></td><td><code>'primary'</code></td><td>Visual emphasis of the action.</td></tr>
              <tr><td><code>size</code></td><td><code>'small' | 'medium' | 'large'</code></td><td><code>'medium'</code></td><td>Controls height, padding, and type size.</td></tr>
              <tr><td><code>loading</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Shows progress and prevents activation.</td></tr>
              <tr><td><code>iconOnly</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Creates a square control; provide an aria-label.</td></tr>
              <tr><td><code>leadingIcon</code></td><td><code>ReactNode</code></td><td>—</td><td>Decorative icon before the label.</td></tr>
              <tr><td><code>trailingIcon</code></td><td><code>ReactNode</code></td><td>—</td><td>Decorative icon after the label.</td></tr>
            </tbody></table></div>
          </div>

          <aside className="accessibility-note"><Check size={19} /><div><h3>Accessibility guidance</h3><p>Use visible labels whenever possible. Icon-only buttons need an <code>aria-label</code>. Loading buttons expose <code>aria-busy</code> and are disabled to prevent duplicate submissions. Focus remains visible for keyboard users.</p></div></aside>
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
