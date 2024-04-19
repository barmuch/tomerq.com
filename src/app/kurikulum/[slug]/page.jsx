import Navbar from '@/components/navbar'
import MateriContent from '@/components/MateriContent'

const getData = async (slug) => {
    const res = await fetch(`http://localhost:3000/api/kurikulums/${slug}`);
  
    if (!res.ok) {
      throw new Error("Failed");
    }
  
    return res.json();
  };
const Materi = async({params}) => {
    const { slug } = params

    const data = await getData(slug)
    
  return (
    <div className=''>
        <div className='bg-primary1 text-primary2'><Navbar/></div>
        <MateriContent data={data} />         
    </div>
  )
}

export default Materi