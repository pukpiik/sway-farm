import { useState } from "react";
import { ContractAbi } from "../contracts";
import { Button, Spinner, BoxCentered } from "@fuel-ui/react";
import { buttonStyle } from "../constants";

interface NewPlayerProps {
    contract: ContractAbi | null;
    updatePageNum: () => void;
}

export default function NewPlayer({ contract, updatePageNum }: NewPlayerProps) {
    const [status, setStatus] = useState<'error' | 'loading' | 'none'>('error');
    async function handleNewPlayer() {
        if (contract !== null) {
            try {
                setStatus('loading')
                await contract.functions.new_player()
                    .txParams({ variableOutputs: 1 })
                    .call();
                setStatus('none')
                updatePageNum()
            } catch (err) {
                console.log("Error:", err)
                setStatus('error')
            }
        } else {
            console.log("ERROR: contract missing");
            setStatus('error')
        }
    }

    return (
        <>
            <div className="new-player-modal">
                {status === 'none' &&
                    <Button css={buttonStyle} onPress={handleNewPlayer}>Make A New Player</Button>
                }
            {status === 'error' && (
                <div>
                    <p>Something went wrong!</p>
                    <Button 
                    css={buttonStyle} 
                    onPress={() => {setStatus('none'); updatePageNum()}}
                    >
                        Try Again
                    </Button>
                </div>
            )}
            {status === 'loading' && <BoxCentered><Spinner color="#754a1e"/></BoxCentered>}
            </div>
        </>
    )
}