# How I Used RFC 2119-Compliant `.amazonq/rules` to Build a Real App with Amazon Q — Fast

*How industry-standard rule specifications helped me build a scalable, accessible coffee shop POS system with Next.js, TypeScript, and Supabase*

---

## ☕ The Challenge: Real-World AI Development

I set out to build a modern Point of Sale (POS) system for coffee shops using **Next.js 14**, **TypeScript**, **Supabase**, and **Tailwind CSS**. The stack was solid, but the scope was huge: real-time order management, secure authentication, responsive UI, and database operations.

But here's what I discovered: **the secret to successful AI-assisted development isn't just about the prompts you write—it's about the standards-compliant rules you establish.**

## Enter RFC 2119-Compliant `.amazonq/rules`: The Game Changer

The `.amazonq/rules` directory in my project isn't just documentation—it's a **standards-based specification** that ensures every AI-generated piece of code follows consistent patterns, security practices, and architectural decisions using RFC 2119 keywords.

---

## 🤖 What is RFC 2119-Compliant `.amazonq/rules`?

With [**Amazon Q CLI**](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/context-project-rules.html), you can create a folder in your project root called `.amazonq/rules`. Each Markdown file in that folder teaches the AI **how to write code in your style, architecture, and standards** using industry-standard RFC 2119 specification language.

In my POS app, this turned out to be a game-changer. I stopped getting random, inconsistent code snippets—and started getting production-grade components that *just worked* because the AI understood the difference between **MUST** (absolute requirements) and **SHOULD** (strong recommendations).

```bash
.amazonq/rules/
├── 01-code-style.md        # TypeScript patterns, naming conventions
├── 02-supabase-database.md # Database access, auth patterns  
├── 03-ui-components.md     # Component design, accessibility
├── 04-security-auth.md     # Security practices, data protection
└── 05-nextjs-eslint.md     # Next.js best practices, performance
```

Each rule file acted like a **technical specification** between me and the AI, using RFC 2119 keywords to clearly distinguish requirements from recommendations.

---

## 🎯 1. Consistent Code, Every Time (With Clear Requirements)

Without guidance, AI-generated code can be inconsistent—different naming, no error handling, etc. But with RFC 2119-compliant `01-code-style.md`, the AI understood exactly what was required vs. recommended:

**MUST Requirements:**
- TypeScript interfaces **MUST** be defined for all data structures
- **camelCase** naming **MUST** be used for variables and functions
- Absolute imports with `@/` prefix **MUST** be used for project files

**SHOULD Recommendations:**
- Reusable logic **SHOULD** be extracted into custom hooks
- Controlled components **SHOULD** be preferred over uncontrolled ones

This made onboarding new features feel like plugging into an existing system—not starting from scratch.

---

## 🔐 2. Security by Design (With Absolute Requirements)

The RFC 2119-compliant `04-security-auth.md` rules ensure that every authentication-related code follows these principles with clear requirement levels:

```markdown
## Data Protection
- Sensitive data MUST NOT be exposed in client-side code
- All user inputs MUST be validated on both client and server
- Proper content security policies SHOULD be used
- Rate limiting SHOULD be implemented for API endpoints
```

This means when I request a new user profile component, the AI automatically:
- **MUST** validate sessions before rendering protected content
- **MUST** handle authentication errors gracefully
- **MUST NOT** expose sensitive user information in client-side code
- **MUST** implement proper logout functionality

The RFC 2119 keywords made it crystal clear what was negotiable vs. non-negotiable.

## 🗃️ 3. Type-Safe Database Operations (With Specification Clarity)

The Supabase rules (`02-supabase-database.md`) establish patterns using RFC 2119 keywords that prevent common pitfalls:

```markdown
## Database Access
- Typed queries with the database types MUST be used
- Server components SHOULD be used for initial data fetching when possible
- Loading and error states MUST be handled for all data fetching operations
```

Every database interaction in my POS system follows these patterns, resulting in:
- Type-safe queries that catch errors at compile time (**MUST** requirement)
- Proper loading states for better UX (**MUST** requirement)
- Consistent error handling across all features (**MUST** requirement)
- Optimized data fetching strategies (**SHOULD** recommendation)

## 🧑‍🦽 4. Accessible, Reusable UI Components (With Standards Compliance)

I didn't want pretty components—I wanted **accessible, keyboard-friendly**, and **screen reader-compatible** UIs. So I wrote RFC 2119-compliant `03-ui-components.md`:

```markdown
## Accessibility
- All interactive elements MUST be keyboard accessible
- Semantic HTML elements MUST be used
- Proper ARIA attributes MUST be included when needed
- Sufficient color contrast MUST be maintained
- Components SHOULD be tested with screen readers
```

The AI followed this specification precisely. For every `Button`, `Dialog`, or `Dropdown`, I got:

- ARIA-compliant components (**MUST** requirement)
- Tailwind-based styling that respected my theme (**MUST** requirement)
- Keyboard events like `Enter`, `Escape`, `Tab` implemented (**MUST** requirement)
- Screen reader testing recommendations (**SHOULD** guidance)

---

## 🚀 The Impact: Metrics That Matter

After introducing RFC 2119-compliant `.amazonq/rules`, here's what changed in my workflow:

| Metric | Before | After |
|--------|--------|-------|
| Code Review Time | ~2 hrs / feature | ~30 min |
| Bug Reports | Frequent UI / auth issues | Reduced by 60% |
| Dev Speed | 1 feature/day | 3+ features/day |
| Lighthouse Accessibility Score | 78 | 98 ✅ |
| Rule Compliance | Inconsistent | 100% (MUST requirements) |

The key difference: **MUST** requirements were never violated, while **SHOULD** recommendations provided flexibility where needed.

---

## 🧱 The Architecture That Emerged

What's powerful is that this architecture wasn't pre-designed—it *emerged* from consistent AI output based on RFC 2119-compliant rules.

```txt
├── app/                 # Next.js App Router w/ layout, error boundaries
├── components/          # Accessible, reusable UI
│   ├── auth/            # Secure login, signup, session handling
│   ├── order/           # Real-time order logic via Supabase channels
│   └── ui/              # Shared design system (button, modal, toast)
├── contexts/            # Global state (cart, theme)
├── hooks/               # Business logic (useOrders, useSession)
└── lib/                 # Server-side db queries, types, and utilities
```

Every piece follows the established patterns, making the codebase predictable and maintainable because the AI understood which patterns were **MUST** follow vs. **SHOULD** consider.

## 💡 Key Lessons for Standards-Based AI Development

### ✅ 1. Write RFC 2119-Compliant Rules First  
Establish your rules using **MUST**, **SHOULD**, **MAY** keywords before writing code. This creates a technical specification that guides AI like a senior architect would.

### ✅ 2. Use MUST for Security and Accessibility  
Don't let critical requirements become "suggestions." Use **MUST** and **MUST NOT** for non-negotiable items like security validation and accessibility compliance.

### ✅ 3. SHOULD for Best Practices  
Use **SHOULD** for strong recommendations that improve code quality but aren't absolute requirements, like performance optimizations or code organization preferences.

### ✅ 4. Standards-Based AI Partnership  
The RFC 2119-compliant `.amazonq/rules` approach represents a fundamental shift toward treating AI as a development partner that understands and enforces industry-standard specifications.

This coffee shop POS system—with its real-time order tracking, secure authentication, and responsive design—was built faster and more reliably than traditional development approaches, all because the AI understood the **specification-level requirements** of the system.

---

## 🌍 Try It Yourself

Want to build faster and safer using standards-compliant Amazon Q rules?

Start with these RFC 2119-compliant rule files from my project:

1. **Code Style**: TypeScript naming (MUST), folder patterns (SHOULD)
2. **Database**: Supabase type safety (MUST), RLS best practices (MUST)
3. **UI Components**: Keyboard accessibility (MUST), responsive design (MUST)
4. **Security**: Authentication validation (MUST), input sanitization (MUST)
5. **Next.js**: App Router patterns (MUST), performance optimization (SHOULD)

### RFC 2119 Keywords Reference:
- **MUST** / **MUST NOT**: Absolute requirements
- **SHOULD** / **SHOULD NOT**: Strong recommendations  
- **MAY**: Optional features
- **REQUIRED**: Synonym for MUST
- **RECOMMENDED**: Synonym for SHOULD

---

📦 **Repo**: [POS Coffee Shop](https://github.com/ccmelvin/pos-coffee-shop)  
🌐 **Live Demo**: [View App](https://pos-coffee-shop.vercel.app)  
🛠 **Stack**: Next.js 14, TypeScript, Supabase, Tailwind, Amazon Q CLI  
📋 **Standards**: RFC 2119-compliant rule specifications

---
