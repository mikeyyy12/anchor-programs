import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Voting } from "../target/types/voting";
import { PublicKey } from "@solana/web3.js";

describe("voting", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.voting as Program<Voting>;

  const wallet = provider.wallet as anchor.Wallet;

  it("Initialized poll!", async () => {
    const tx =await program.methods.initalizePoll(
        new anchor.BN(1),
        new anchor.BN(0),
        new anchor.BN(1759916844),
        "What is you favorite peanut butter"
    ).accounts({signer:wallet.publicKey}).rpc()
    const [pollAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer,'le',8)],
      program.programId
    )
    const poll = await program.account.poll.fetch(pollAddress);

    console.log(JSON.stringify(poll, null, 2));
  });
});
