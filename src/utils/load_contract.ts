import contract from "@truffle/contract"
import {apiProvider} from "../types";

export const LoadContract = async (contractName: string, provider: apiProvider) => {
    const contractContent = await fetch(`/contracts/${contractName}.json`)
    const Artifact = await contractContent.json()
    // @ts-ignore
    const _contract = contract(Artifact)
    _contract.setProvider(provider)

    let deployedContract = null
    try {
        deployedContract = await _contract.deployed()
    } catch (e) {
        if (e instanceof Error) console.error(e.message)
    }

    return deployedContract
}