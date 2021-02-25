import React from 'react'
import {useRouter} from 'next/router'
import {Menu, MenuList, MenuButton, MenuItem} from '@reach/menu-button'

export default function ToC() {
  const router = useRouter()

  function isActive(url) {
    return url !== '/' ? router.pathname.match(url) : false
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
      <MenuList>
        <Item url="/01-mental-models">
          <a>Mental Models</a>
        </Item>
        <Item url="/02-the-javascript-universe">
          <a>The JavaScript Universe</a>
        </Item>
        <Item url="/03-values-and-variables">
          <a>Values And Variables</a>
        </Item>
        <Item url="/04-studying-from-the-inside">
          <a>Studying from the Inside</a>
        </Item>
        <Item url="/05-meeting-the-primitive-values">
          <a>Meeting the Primitive Values</a>
        </Item>
        <Item url="/06-meeting-objects-and-functions">
          <a>Meeting Objects and Functions</a>
        </Item>
        <Item url="/07-equality-of-values">
          <a>Equality Of Values</a>
        </Item>
        <Item url="/08-properties">
          <a>Properties</a>
        </Item>
        <Item url="/09-mutation">
          <a>Mutation</a>
        </Item>
        <Item url="/10-prototypes">
          <a>Prototypes</a>
        </Item>
        <Item url="/content">
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
