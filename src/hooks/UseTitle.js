import { useEffect } from "react";

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} | Resale Treasury`;
    }, [title])
}

export default useTitle;