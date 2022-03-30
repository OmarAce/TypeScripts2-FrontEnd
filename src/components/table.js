const Table = ({ data, column }) => {
  return (
    <div className="flex justify-center ">
      <table className="border w-2/3" >
        <thead className="border-4">
          <tr className="">
            {column.map((item, index) => <TableHeadItem className=" " item={item} />)}
          </tr>
        </thead>
        <tbody >
          {data.map((item, index) => <TableRow className='' item={item} column={column} />)}
        </tbody>
      </table>
    </div >
  )
}

const TableHeadItem = ({ item }) => <th className='py-2'> {item.heading}</th >
const TableRow = ({ item, column }) => (
  <tr className='odd:bg-zinc-900'>
    {column.map((columnItem, index) => {

      if (columnItem.value.includes('.')) {
        const itemSplit = columnItem.value.split('.') //['address', 'city']
        return <td className=" border-r">{item[itemSplit[0]][itemSplit[1]]}</td>
      }

      return <td className="">{item[`${columnItem.value}`]}</td>
    })}
  </tr>
)

export default Table