import React from 'react'
import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/app/(dashboard)/test/[id]/results/columns';

const Takers = ({test}:any) => {

    console.log(test);

  return (
    <div>
             <DataTable columns={columns} data={test} />
    </div>

  )
}

export default Takers;