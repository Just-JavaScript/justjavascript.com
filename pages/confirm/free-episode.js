export { default } from 'components/content-redirect'

export async function getServerSideProps() {
  return {
    redirect: { destination: '/learn/02-the-javascript-universe', permanent: false },
  }
}
