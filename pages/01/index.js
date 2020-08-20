import Article from '../../components/layouts/article'
import Link from 'next/link'
import fs from 'fs'

export default function List({posts}) {
  const itemStyles =
    'p-8 border border-gray-100 rounded-lg w-full bg-white shadow-sm font-serif font-semibold hover:bg-cool-gray-50 hover:border-gray-200 transition-colors ease-in-out duration-200'
  return (
    <Article
      title="Index"
      className="max-w-screen-md mx-auto pb-40 sm:px-8 px-5"
    >
      <div className="grid grid-cols-1 gap-4">
        <Link href="01/01-mental-models">
          <a
            className={itemStyles}
            style={{color: 'black', fontSize: '1.5rem'}}
          >
            <span
              className="mr-4 font-sans text-indigo-600 font-light"
              style={{fontFamily: 'sans'}}
            >
              01
            </span>
            Mental Models
          </a>
        </Link>

        <Link href="01/02-the-javascript-universe">
          <a
            className={itemStyles}
            style={{color: 'black', fontSize: '1.5rem'}}
          >
            <span
              className="mr-4 font-sans text-indigo-600 font-light"
              style={{fontFamily: 'sans'}}
            >
              02
            </span>
            The JavaScript Universe
          </a>
        </Link>

        <Link href="01/03-values-and-variables">
          <a
            className={itemStyles}
            style={{color: 'black', fontSize: '1.5rem'}}
          >
            <span
              className="mr-4 font-sans text-indigo-600 font-light"
              style={{fontFamily: 'sans'}}
            >
              03
            </span>
            Values And Variables
          </a>
        </Link>

        <Link href="01/04-counting-the-values-pt1">
          <a
            className={itemStyles}
            style={{color: 'black', fontSize: '1.5rem'}}
          >
            <span
              className="mr-4 font-sans text-indigo-600 font-light"
              style={{fontFamily: 'sans'}}
            >
              04
            </span>
            Counting The Values — Part 1
          </a>
        </Link>

        <Link href="01/05-counting-the-values-pt2">
          <a
            className={itemStyles}
            style={{color: 'black', fontSize: '1.5rem'}}
          >
            <span
              className="mr-4 font-sans text-indigo-600 font-light"
              style={{fontFamily: 'sans'}}
            >
              05
            </span>
            Counting The Values — Part 2
          </a>
        </Link>

        <Link href="01/06-equality-of-values">
          <a
            className={itemStyles}
            style={{color: 'black', fontSize: '1.5rem'}}
          >
            <span
              className="mr-4 font-sans text-indigo-600 font-light"
              style={{fontFamily: 'sans'}}
            >
              06
            </span>
            Equality Of Values
          </a>
        </Link>

        <Link href="01/07-properties">
          <a
            className={itemStyles}
            style={{color: 'black', fontSize: '1.5rem'}}
          >
            <span
              className="mr-4 font-sans text-indigo-600 font-light"
              style={{fontFamily: 'sans'}}
            >
              07
            </span>
            Properties
          </a>
        </Link>

        <Link href="01/08-mutation">
          <a
            className={itemStyles}
            style={{color: 'black', fontSize: '1.5rem'}}
          >
            <span
              className="mr-4 font-sans text-indigo-600 font-light"
              style={{fontFamily: 'sans'}}
            >
              08
            </span>
            Mutation
          </a>
        </Link>

        <Link href="01/09-prototypes">
          <a
            className={itemStyles}
            style={{color: 'black', fontSize: '1.5rem'}}
          >
            <span
              className="mr-4 font-sans text-indigo-600 font-light"
              style={{fontFamily: 'sans'}}
            >
              09
            </span>
            Prototypes
          </a>
        </Link>
      </div>
    </Article>
  )
}

export async function getStaticProps({params}) {
  //   const postsDirectory = path.join(process.cwd(), 'pages/01')
  //   console.log(postsDirectory)
  const mdxFiles = fs.readdirSync('./')
  // const mdxFiles = fs.readdirSync("posts")
  // Loop through all post files and create array of slugs (to create links)
  const paths = mdxFiles.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }))

  return {
    props: {
      posts: paths,
      // or posts: postsWithFrontmatter
    },
  }
}
