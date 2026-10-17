// Keep old purchase and account links useful without loading legacy services.
export default function ContentRedirect() {
  return null
}

export async function getServerSideProps() {
  return {
    redirect: { destination: '/learn', permanent: false },
  }
}
