# L'oasis Villa

Application complete Next.js (front office + back office admin) pour la gestion d'une villa de location a Djerba.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- Supabase (DB, auth optionnelle, storage)
- Zod + React Hook Form
- Framer Motion

## Routes
### Front office
- `/`
- `/villa`
- `/galerie`
- `/localisation`
- `/contact`

### Back office (protege)
- `/admin/login`
- `/admin/dashboard`
- `/admin/photos`
- `/admin/contenu`
- `/admin/equipements`
- `/admin/disponibilites`
- `/admin/demandes`
- `/admin/seo`
- `/admin/parametres`

## Demarrage local
1. Installer les dependances:
```bash
npm install
```
2. Copier `.env.example` vers `.env.local` puis remplir les variables.
3. Lancer:
```bash
npm run dev
```

## Variables d'environnement
Voir `.env.example`.

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`: acces public
- `SUPABASE_SERVICE_ROLE_KEY`: requis pour CRUD admin persistant
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`: fallback login admin local
- `SESSION_SECRET`: signature cookie admin

## Supabase setup
1. Creer un projet Supabase.
2. Executer la migration SQL:
- `supabase/migrations/20260601_init.sql`
3. Creer un utilisateur admin dans `auth.users`.
4. Inserer le profil admin:
```sql
insert into public.profiles (id, email, role)
values ('<auth-user-id>', 'admin@loasisvilla.com', 'admin');
```

## Storage images
- Bucket public: `villa-photos`
- Politiques RLS incluses dans la migration
- Fallback local: `public/images/villa/*` si Supabase n'est pas configure

## Back office: operations principales
- Photos: ajout, suppression, titre, categorie, publication, hero, ordre
- Contenu: hero, textes, marque, WhatsApp, Messenger
- Equipements: CRUD complet
- Disponibilites: blocage et suppression de periodes
- Demandes: liste, filtre, changement de statut, contact WhatsApp
- SEO: meta title/description, OG, keywords

## API
- `POST /api/booking` enregistre une demande (validation Zod)
- `GET /api/admin/logout` supprime la session admin

## SEO
- Metadata par defaut dans `app/layout.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- JSON-LD type `VacationRental` sur la home

## Deploiement Vercel
1. Push GitHub
2. Importer le projet dans Vercel
3. Definir toutes les variables d'environnement de `.env.example`
4. Deploy

## Qualite
- Middleware de protection `/admin/*`
- Session admin signee (cookie `httpOnly`)
- Validation serveur Zod
- UI responsive mobile-first
- Images via Next/Image + lazy loading

## Notes
- Sans `SUPABASE_SERVICE_ROLE_KEY`, l'application fonctionne en mode fallback (memoire + images locales) pour demonstration.
- Pour la production, configurez Supabase completement pour persister toutes les modifications admin.

