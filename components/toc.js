import React from 'react'
import {useRouter} from 'next/router'
import {Menu, MenuList, MenuButton, MenuItem} from '@reach/menu-button'

export const episodes = [
  {
    path: 'learn/01-mental-models',
    slug: '01-mental-models',
    title: 'Mental Models',
  },
  {
    path: 'learn/02-the-javascript-universe',
    slug: '02-the-javascript-universe',
    title: 'The JavaScript Universe',
    quiz: '02-the-javascript-universe',
  },
  {
    path: 'learn/03-values-and-variables',
    slug: '03-values-and-variables',
    title: 'Values and Variables',
    quiz: '03-values-and-variables',
  },
  {
    path: 'learn/04-studying-from-the-inside',
    slug: '04-studying-from-the-inside',
    title: 'Studying from the Inside',
  },
  {
    path: 'learn/05-meeting-the-primitive-values',
    slug: '05-meeting-the-primitive-values',
    title: 'Meeting the Primitive Values',
    quiz: '05-meeting-the-primitive-values',
  },
  {
    path: 'learn/06-meeting-objects-and-functions',
    slug: '06-meeting-objects-and-functions',
    title: 'Meeting Objects and Functions',
    quiz: '06-meeting-objects-and-functions',
  },
  {
    path: 'learn/07-equality-of-values',
    slug: '07-equality-of-values',
    title: 'Equality of Values',
    quiz: '07-equality-of-values',
  },
  {
    path: 'learn/08-properties',
    slug: '08-properties',
    title: 'Properties',
    quiz: '08-properties',
  },
  {
    path: 'learn/09-mutation',
    slug: '09-mutation',
    title: 'Mutation',
    quiz: '09-mutation',
  },
  {
    path: 'learn/10-prototypes',
    slug: '10-prototypes',
    title: 'Prototypes',
    quiz: '10-prototypes',
  },
]

export default function ToC() {
  const router = useRouter()

  function isActive(url) {
    return url !== '/' ? router.asPath.match(url) : false
  }

  const Item = (props) => {
    return (
      <MenuItem
        onSelect={() => router.push(props.url)}
        className={isActive(props.url) ? 'bg-gray-100 font-semibold' : ''}
      >
        {isActive(props.url) && (
          <svg
            className="inline-block -ml-5 text-gray-500"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0z"
                fill="currentColor"
              />
            </g>
          </svg>
        )}
        {props.children}
      </MenuItem>
    )
  }

  return (
    <Menu>
      <MenuButton>
        {/* prettier-ignore */}
        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g></svg>
      </MenuButton>
      <MenuList className="relative z-20">
        {episodes.map((episode) => (
          <Item key={episode.path} url={`/${episode.path}`}>
            <a>{episode.title}</a>
          </Item>
        ))}
        <Item url="/learn">
          <a className="flex items-center">
            {/* prettier-ignore */}
            <svg className="mr-2" width="18" height="18" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path d="M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414l-7-7z" fill="currentColor"/></g></svg>
            Index
          </a>
        </Item>
      </MenuList>
    </Menu>
  )
}
