import { useEffect, useState } from 'react'
import { ArrowRight, AtSign, Box, Check, CheckCircle2, Code2, Command, Copy, GitFork, Menu, Moon, Palette, Plus, Search, Settings, Sparkles, Sun, X } from 'lucide-react'
import { Button } from './components/Button'
import { Input } from './components/Input'
import { Select } from './components/Select'
import { Textarea } from './components/Textarea'
import './App.css'

const navigation = [
  { label: 'Foundations', items: ['Colors', 'Typography', 'Spacing', 'Icons'] },
  { label: 'Components', items: ['Button', 'Input', 'Select', 'Dialog'] },
]

const codeExample = `import { Button } from '@relay-ui/react'

export function SaveAction() {
  return <Button variant="primary">Save changes</Button>
}`

const roleOptions = [
  { label: 'Product', options: [{ value: 'designer', label: 'Product designer' }, { value: 'manager', label: 'Product manager' }] },
  { label: 'Engineering', options: [{ value: 'frontend', label: 'Frontend engineer' }, { value: 'backend', label: 'Backend engineer' }, { value: 'platform', label: 'Platform engineer' }] },
]

const timezoneOptions = [
  { value: 'pt', label: 'Pacific Time (PT)' },
  { value: 'mt', label: 'Mountain Time (MT)' },
  { value: 'ct', label: 'Central Time (CT)' },
  { value: 'et', label: 'Eastern Time (ET)' },
]

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedSize, setSelectedSize] = useState('Medium')
  const [selectedState, setSelectedState] = useState<'default' | 'loading' | 'disabled'>('default')
  const [fieldState, setFieldState] = useState<'default' | 'error' | 'success' | 'disabled' | 'readonly'>('default')
  const [selectState, setSelectState] = useState<'default' | 'error' | 'success' | 'disabled'>('default')
  const [selectedRole, setSelectedRole] = useState('')

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

        <section className="field-docs" id="input" aria-labelledby="field-docs-title">
          <div className="docs-intro"><p className="kicker">Form components</p><h2 id="field-docs-title">Input &amp; Textarea</h2><p>Fields collect structured and freeform information while keeping labels, guidance, validation, and state clear for every user.</p></div>

          <div className="component-workbench field-workbench">
            <div className="field-preview">
              <Input
                label="Work email"
                type="email"
                placeholder="you@company.com"
                description={fieldState === 'error' ? undefined : 'Use the address associated with your team.'}
                error={fieldState === 'error' ? 'Enter a valid work email.' : undefined}
                success={fieldState === 'success'}
                disabled={fieldState === 'disabled'}
                readOnly={fieldState === 'readonly'}
                defaultValue={fieldState === 'readonly' ? 'designer@relay.dev' : undefined}
                leadingIcon={<AtSign size={17} />}
                trailingIcon={fieldState === 'success' ? <CheckCircle2 size={17} /> : undefined}
                required
              />
              <Textarea label="Project summary" placeholder="Describe what you are building..." description="Help collaborators understand the goal." showCharacterCount maxLength={180} disabled={fieldState === 'disabled'} readOnly={fieldState === 'readonly'} />
            </div>
            <div className="controls-pane single-control"><label className="control-row"><span>Preview state</span><select className="select-control" value={fieldState} onChange={(event) => setFieldState(event.target.value as typeof fieldState)}><option value="default">Default</option><option value="error">Error</option><option value="success">Success</option><option value="disabled">Disabled</option><option value="readonly">Read only</option></select></label></div>
          </div>

          <div className="docs-block field-examples">
            <div className="docs-heading"><div><h3>Common states</h3><p>Validation messages explain how to recover instead of relying on color alone.</p></div></div>
            <div className="field-example-grid">
              <Input label="Default" placeholder="Enter a value" description="Helpful context goes here." />
              <Input label="Success" defaultValue="relay-ui" success trailingIcon={<CheckCircle2 size={17} />} description="This name is available." />
              <Input label="Error" defaultValue="relay ui" error="Use letters, numbers, or hyphens." />
              <Input label="Disabled" defaultValue="Unavailable" disabled description="This field cannot be edited." />
            </div>
          </div>

          <div className="docs-grid">
            <div className="docs-block"><div className="docs-heading"><div><h3>With icons</h3><p>Decorative icons add context without replacing labels.</p></div></div><div className="example-card form-example"><Input label="Email address" type="email" placeholder="name@example.com" leadingIcon={<AtSign size={17} />} /></div></div>
            <div className="docs-block" id="textarea"><div className="docs-heading"><div><h3>Character count</h3><p>Use a counter when content has a meaningful limit.</p></div></div><div className="example-card form-example"><Textarea label="Short bio" placeholder="A few words about you" showCharacterCount maxLength={120} /></div></div>
          </div>

          <div className="docs-block">
            <div className="docs-heading"><div><h3>Field props</h3><p>Both components extend their native HTML element attributes.</p></div></div>
            <div className="props-table-wrap"><table className="props-table"><thead><tr><th>Prop</th><th>Component</th><th>Type</th><th>Description</th></tr></thead><tbody>
              <tr><td><code>label</code></td><td>Both</td><td><code>ReactNode</code></td><td>Visible accessible label for the field.</td></tr>
              <tr><td><code>description</code></td><td>Both</td><td><code>ReactNode</code></td><td>Guidance associated through aria-describedby.</td></tr>
              <tr><td><code>error</code></td><td>Both</td><td><code>ReactNode</code></td><td>Marks the field invalid and announces the message.</td></tr>
              <tr><td><code>success</code></td><td>Both</td><td><code>boolean</code></td><td>Applies successful validation styling.</td></tr>
              <tr><td><code>leadingIcon</code></td><td>Input</td><td><code>ReactNode</code></td><td>Decorative icon at the start of the control.</td></tr>
              <tr><td><code>trailingIcon</code></td><td>Input</td><td><code>ReactNode</code></td><td>Decorative icon at the end of the control.</td></tr>
              <tr><td><code>showCharacterCount</code></td><td>Textarea</td><td><code>boolean</code></td><td>Displays a live count, optionally with maxLength.</td></tr>
            </tbody></table></div>
          </div>

          <aside className="accessibility-note"><Check size={19} /><div><h3>Accessibility guidance</h3><p>Labels are always visible and programmatically connected. Descriptions, errors, and character counts are associated with <code>aria-describedby</code>; invalid fields use <code>aria-invalid</code>; native disabled, required, and read-only behavior is preserved.</p></div></aside>
        </section>

        <section className="select-docs" id="select" aria-labelledby="select-docs-title">
          <div className="docs-intro"><p className="kicker">Selection component</p><h2 id="select-docs-title">Select</h2><p>Select lets people choose one value from a predefined list. It preserves native browser and assistive-technology behavior while matching the Relay UI field system.</p></div>

          <div className="component-workbench select-workbench">
            <div className="select-preview">
              <Select
                label="Your role"
                options={roleOptions}
                placeholder="Select a role"
                value={selectedRole}
                onChange={(event) => setSelectedRole(event.target.value)}
                description={selectState === 'error' ? undefined : 'This helps us personalize your workspace.'}
                error={selectState === 'error' ? 'Choose the role that best matches your work.' : undefined}
                success={selectState === 'success'}
                disabled={selectState === 'disabled'}
                required
              />
            </div>
            <div className="controls-pane single-control"><label className="control-row"><span>Preview state</span><select className="select-control" value={selectState} onChange={(event) => setSelectState(event.target.value as typeof selectState)}><option value="default">Default</option><option value="error">Error</option><option value="success">Success</option><option value="disabled">Disabled</option></select></label></div>
          </div>

          <div className="docs-grid select-examples">
            <div className="docs-block"><div className="docs-heading"><div><h3>Placeholder</h3><p>Prompt for a choice without preselecting an answer.</p></div></div><div className="example-card form-example"><Select label="Timezone" options={timezoneOptions} placeholder="Choose a timezone" description="Used for notifications and due dates." /></div></div>
            <div className="docs-block"><div className="docs-heading"><div><h3>Grouped options</h3><p>Use groups to make longer related lists easier to scan.</p></div></div><div className="example-card form-example"><Select label="Role" options={roleOptions} placeholder="Choose a role" /></div></div>
          </div>

          <div className="docs-block">
            <div className="docs-heading"><div><h3>Validation states</h3><p>Messages describe the status explicitly instead of relying on border color.</p></div></div>
            <div className="field-example-grid">
              <Select label="Default" options={timezoneOptions} placeholder="Choose an option" />
              <Select label="Success" options={timezoneOptions} defaultValue="pt" success description="Timezone saved." />
              <Select label="Error" options={timezoneOptions} placeholder="Choose an option" error="Select a timezone to continue." />
              <Select label="Disabled" options={timezoneOptions} defaultValue="et" disabled description="Managed by your organization." />
            </div>
          </div>

          <div className="docs-block">
            <div className="docs-heading"><div><h3>Props</h3><p>Select extends native HTML select attributes.</p></div></div>
            <div className="props-table-wrap"><table className="props-table"><thead><tr><th>Prop</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody>
              <tr><td><code>label</code></td><td><code>ReactNode</code></td><td>Yes</td><td>Visible accessible label for the control.</td></tr>
              <tr><td><code>options</code></td><td><code>(SelectOption | SelectOptionGroup)[]</code></td><td>Yes</td><td>Flat or grouped data used to render options.</td></tr>
              <tr><td><code>placeholder</code></td><td><code>string</code></td><td>No</td><td>Disabled initial option prompting the user to choose.</td></tr>
              <tr><td><code>description</code></td><td><code>ReactNode</code></td><td>No</td><td>Helpful text associated with the select.</td></tr>
              <tr><td><code>error</code></td><td><code>ReactNode</code></td><td>No</td><td>Marks the control invalid and announces the error.</td></tr>
              <tr><td><code>success</code></td><td><code>boolean</code></td><td>No</td><td>Applies successful validation styling.</td></tr>
            </tbody></table></div>
          </div>

          <aside className="accessibility-note"><Check size={19} /><div><h3>Accessibility guidance</h3><p>Relay UI uses the native <code>select</code> element, retaining operating-system keyboard controls, touch behavior, and screen-reader support. The visible label, helper text, and validation message are programmatically associated.</p></div></aside>
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
