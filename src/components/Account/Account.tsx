import {AccountProps} from "./Account.props";
import cn from "classnames";
import {Button} from "../Button/Button";
import {useContext, useEffect, useState} from "react";
import {MetaMaskInpageProvider} from "@metamask/providers";
import Web3 from "web3";
import {provider as providerType} from "web3-core";
import {AppContext, IAppContext} from "../../context/App.context";


export const Account = ({ className, ...props }: AccountProps): JSX.Element => {
    const { contract, provider } = useContext<IAppContext>(AppContext)
    const web3 = new Web3(provider as providerType)

    const [account, setAccount] = useState<string>('')
    const [balance, setBalance] = useState<string>('0')
    const [shouldReload, reload] = useState<boolean>(false)
    const canAccessContract = contract && account

    const reloadEffect = async () => { reload(!shouldReload) }
    const setProviderListener = (provider: any) => {
        provider.on("accountsChanged", () => window.location.reload())
        provider.on("chainChanged", () => window.location.reload())
    }
    if (provider) setProviderListener(provider)

    useEffect(() => {
        const getAccount = async () => {
            const accounts = await web3.eth.getAccounts()

            if (accounts) {
                setAccount(accounts[0])
            } else {
                console.error("MetaMask is not installed")
            }
        }

        provider && getAccount()
    }, [provider])

    useEffect(() => {
        const getBalance = async () => {
            const _balance = await web3.eth.getBalance(contract.address) || balance

            if (web3) setBalance(web3.utils.fromWei(_balance, "ether"))
        }

        contract && getBalance()
    }, [contract, shouldReload])

    return (
        <div
            className={cn(className)}
            {...props}
        >
                <>
                    <div>Account: {
                        (account) ? account :
                            !provider ? <div
                                    className='notification is-warning is-size-5 is-rounded'
                                >
                                    Wallet is not detected
                                </div>
                            : <Button
                                size='small'
                                className='button is-small mb-4'
                                onClick={() =>
                                    (provider as MetaMaskInpageProvider).request({method: "eth_requestAccounts"})
                                }
                                >
                                Connect to Wallet
                            </Button>
                        }
                        <p>Current balance: <strong>{balance}</strong> ETH</p>
                    </div>
                    <Button
                        size='small'
                        disabled={!canAccessContract}
                        className='button is-light is-primary is-link mr-2'
                        onClick={async () => {
                            await contract.addFunds({
                               from: account,
                               value: web3.utils.toWei("1", "ether")
                            })
                            await reloadEffect()
                        }}
                    >Donate 1 ETH</Button>
                    <Button
                        size='large'
                        disabled={!canAccessContract}
                        className='button is-success is-light'
                        onClick={async () => {
                            await contract.withdraw(web3.utils.toWei("0.05", "ether"), {from: account})
                            await reloadEffect()
                        }}
                    >Withdraw</Button>
                </>
        </div>
    )
}