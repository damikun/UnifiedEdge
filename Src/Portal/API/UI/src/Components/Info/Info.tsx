
export default function Help(){
    return <div className="flex h-full w-full items-center justify-center">
        <div className="p-3 lg:p-5 max-w-2xl space-y-3">
            <div className="flex flex-row space-x-2 font-semibold text-lg">
                <span>Version:</span>
                <span>v0.1-Beta</span>
            </div>

            <div>UnifiedEdge is opensource software (OSS) awailable on Github under MIT license</div>

            
                <div className="flex flex-nowrap flex-row w-40 h-12 bg-blue-100 space-x-2 rounded-lg justify-around items-center">
                    <div>Icon</div>
                    <div className="text-blue-600">Github</div>
                </div>
      

            <div className="flex w-full border-b py-2" />

            <div>
                ©2022 Dalibor Kundrat
            </div>
        </div>
    </div>
}
