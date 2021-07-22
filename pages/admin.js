import React from 'react'
import Layout from 'components/layout'
import axios from 'axios'
import useSWR from 'swr'
import map from 'lodash/map'
import get from 'lodash/get'
import findKey from 'lodash/findKey'
import isEmpty from 'lodash/isEmpty'
import Excalidraw from 'components/excalidraw/excalidraw'
import getChoiceLabelByIndex from 'utils/get-choice-label-by-index'

const fetcher = (url) => axios.get(url).then((res) => res.data)

const AdminPage = () => {
  const { data, isValidating, error } = useSWR(
    '/api/get-all-answers',
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  console.log({ data })

  const List = ({ children }) => {
    return children
  }

  const Item = ({ label, children }) => {
    const [open, setOpen] = React.useState(false)
    return (
      <div>
        <div onClick={() => children && setOpen(!open)}>
          {label} {children && open ? '▲' : '▽'}
        </div>
        {open && <List>{children}</List>}
      </div>
    )
  }

  return (
    <Layout>
      <main className="prose prose-sans mx-auto py-24">
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <ul>
          {map(data, (user, i) => {
            return (
              <li key={user} className="list-item">
                <Item label={findKey(data, user)}>
                  <ul>
                    {map(user, (data) => {
                      return (
                        <li key={data}>
                          <Item label={findKey(user, data)}>
                            <ul>
                              {map(data, (answer) => {
                                const value = answer?.answer
                                const isSketch = value?.includes('[{')
                                const isNumber = Number(value)
                                return (
                                  value && (
                                    <li key={value}>
                                      <Item label={findKey(data, answer)}>
                                        {value && (
                                          <ul>
                                            <li>
                                              answer:{' '}
                                              <span className="font-bold">
                                                {isSketch ? (
                                                  <Excalidraw
                                                    user={{
                                                      name: 'Excalidraw User',
                                                    }}
                                                    initialData={{
                                                      elements:
                                                        JSON.parse(value),
                                                      scrollToContent: true,
                                                    }}
                                                  />
                                                ) : isNumber ? (
                                                  getChoiceLabelByIndex(value)
                                                ) : (
                                                  <code>
                                                    {JSON.stringify(value)}
                                                  </code>
                                                )}
                                              </span>
                                            </li>

                                            {answer?.answer?.comment && (
                                              <li>
                                                comment:
                                                <code>
                                                  {JSON.stringify(
                                                    answer?.answer?.comment
                                                  )}
                                                </code>
                                              </li>
                                            )}
                                          </ul>
                                        )}
                                      </Item>
                                    </li>
                                  )
                                )
                              })}
                            </ul>
                          </Item>
                          {/* {JSON.stringify(data, null, 2)} */}
                        </li>
                      )
                    })}
                  </ul>
                </Item>
                {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
              </li>
            )
          })}
        </ul>
      </main>
    </Layout>
  )
}

export default AdminPage
