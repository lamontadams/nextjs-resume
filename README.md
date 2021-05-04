Based on one of the starter templates for [Learn Next.js](https://nextjs.org/learn), this is a single-page HTML resume. It's intended to be used as an exported pre-rendered site, and at present only uses a very small portion of what's possible with Next.js. 

This thing exists so I could learn about Next.js and how it loads static data for pre-rendered sites, and because I needed a resume. I have some plans to expand and improve the template in the future with links to pages for each employer and special project, and a per-skill page. Some parts of these things exist already in the project, but I'm intellectually honest enough to say that may not ever get to finishing them :shrug:.

# Quickstart
Clone or download this repository. Then from a console at the project root:
`npm install && npm run dev`

You should then be able to open [localhost:3000](http://localhost:3000) in your browser and look at the sample resume. You can run the site this way while you customize and you should see changes you make by just refreshing your brower (`F5`), but you may occasionally need to restart the server by pressing `ctrl + c` (or your Mac equivalent) and then `npm run dev` because of internal caching. 

When you are ready to deploy, run `npm run build` and your generated site will be found in the `out` folder.

# Customization
Build your resume by editing the [markdown](https://www.markdownguide.org/cheat-sheet/) files found under the [data](/data) folder. The files are named and organized in a particular way to represent different parts of the resume. Optional properties can be safely omitted.

Data files can be housed outside of the project folder if you want them to be managed in a seperate git repository. To do so, create a `.env` file in the project root, and add this line to it:
```
DATA_PATH=/home/path/to/data
```

## Education and Certification data
Add your education and certification information to the [education](/data/education) folder, one file per resume item. They will be sorted by end date when displayed on the resume. The following properties are supported in the frontmatter for each file:

- `name` The name of the certification or school
- `start` The date you started attending (optional). 
- `end` The date you stopped attending (optional).

### Dates Quirk
While only the year is displayed, due to a quirk parsing the data tiles, a valid date is required, and it must be enclosed in double-quotes (`"`). So just enter something like `"2020-01-01"` for dates.

## Employment data
Add your employment history to the [employment](/data/employment) folder, one file per resume item. They will be sorted by end date when displayed on the resume. The following properties are supported in the frontmatter for each file:

- `company` The name of the company
- `title` Your position or title
- `start` The date you started working
- `end` The date you stopped working (optional - if omitted "Present" is used)
- `skills` A list of "skill ids" for [skills](#Skills) that were used at this job. This it the first part of the data file name for that skill. If you want an employer to show the skill you put in `html5.md` then you'd put `[html5]` here. An employer can have as many skills as you wish, they will wrap horizontally on the resume.

### Dates Quirk
Due to a quirk parsing the data tiles, a valid date is required, and it must be enclosed in double-quotes (`"`). So just enter something like `"2020-01-01"` for dates. If you omit an end date, the text "Present" will be used instead.

## Project data
Add data regarding important projects you worked on for a given employer to the [projects](/data/projects) folder, one file per project. These will be displayed under the referenced employer line on the resume in a "Notworth Projects" section. These are optional, and the section will not appear if no projects exist for an employer. 

The following properties are supported in the front matter for each file:

- `employment` A list of the "employer id"s of the [employers](#Employment data) this project should appear under. This is the first part of the data file name for that employer: If you want to a project to appear under the employer you put in `Burgermart.md` you'd put `[BurgerMart]` here. Projects can belong to multiple employers but that probably would look repetitive on your resume.
- `name` The name of the project
- `year` The year the project completed

### Dates Quirk
While only the year is displayed, due to a quirk parsing the data tiles, a valid date is required, and it must be enclosed in double-quotes (`"`). So just enter something like `"2020-01-01"` for dates.

## Personal data
The [personal.md](/data/personal.md) file contains your personal and contact information. The file content is used as the "about" blurb in the left-hand profile pane, while the properties are supported in the frontmatter:

- `firstName` Your first name - if you want a middle initial, put it here.
- `lastName` Your last name
- `email` Your email address (optional)
- `github` Your github account name (optional) 
- `home` Your home city, address or location (optional)
- `phone` Your contact phone number (optional)
- `picture` A url to the profile picture (optional, see below)
- `stackoverflow` Your stack overflow numeric account id (optional)
- `twitter` Your twitter handle (optional)
- `web` Your webhsite (optional)

### Profile picture
You have two options for a profile picture. 

Option one: the `personal.md` file supports a `picture` property that can be a relative or absolute url. Relative urls are considered relative to the [public](/public) folder, so `/images/my-picture.jpg` would resolve to the `/public/images/my-picture.jpg` image.

Option two: replace the [default-profile.png](/public/images/default-profile.png) file with a png format image you want to use. It will be resized and given the rounded effect automatically.

## Skills
Add your skills information to the [skills](/data/skills) folder, one file per resume item. They will be sorted alphabetically and grouped by category when displayed on the resume. The following properties are supported in the frontmatter for each file:

- `category` The category for the skill (i.e. "Dev Tools")
- `name` The name of the skill
- `icon` The css class for that skill's icon (optional)

## Icons
The icon set used for skills is from [Devicon](https://devicon.dev/) and is specially suited to developer tools. You can expand this by adding a css import to [layout.tsx](/components/layout.tsx). Once done, you can reference them by stylename in the individual skill data files. 

If not specified, a generic "dev shield" icon will be used. You can change this by editing the [constants.ts](/lib/constants.ts) file.
