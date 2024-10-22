import { JSResource } from "../../util/resources";
import { QuartzTransformerPlugin } from "../types";
// @ts-ignore
import imagetoolkit from "../../components/scripts/imagetoolkit.inline.ts";

export const ImageToolkit: QuartzTransformerPlugin = () => {
    return {
        name: "ImageToolkit",
        externalResources() {
            const js: JSResource[] = []
                
            js.push({
                script: imagetoolkit,
                loadTime: "afterDOMReady",
                contentType: "inline"
            })
            
            return { js }
        }
    }
}