import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Voting } from "../target/types/voting";
import { PublicKey } from "@solana/web3.js";
import { expect } from "chai";

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
        "What is your favorite peanut butter"
    ).accounts({signer:wallet.publicKey}).rpc()
    const [pollAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer,'le',8)],
      program.programId
    )
    const poll = await program.account.poll.fetch(pollAddress);

    console.log(JSON.stringify(poll, null, 2));
  expect(poll.pollId.toNumber()).to.equal(1);

expect(poll.description).to.equal("What is your favorite peanut butter");

expect(poll.pollStart.toNumber()).to.be.lessThan(
  poll.pollEnd.toNumber(),
  "Poll start time must be less than end"
);
  });

  it("initalize candidate",async()=>{
    await program.methods.initalizeCandidate(
      "Smooth",
      new anchor.BN(1)
    ).rpc();

    await program.methods.initalizeCandidate(
      "Crunchy",
      new anchor.BN(1)
    ).rpc()

    const [crunchyAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer,'le',8),Buffer.from("Crunchy")],
      program.programId
    )
    const crunchyCandidate = await program.account.candidate.fetch(crunchyAddress)
    console.log(crunchyCandidate)
    expect(crunchyCandidate.candidateVotes.toNumber()).to.equal(0);

     const [smoothAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer,'le',8),Buffer.from("Smooth")],
      program.programId
    )
    const smoothCandidate = await program.account.candidate.fetch(smoothAddress)
     expect(smoothCandidate.candidateVotes.toNumber()).to.equal(0);
    console.log(smoothCandidate)
  })
  it("Vote",async()=>{

    await program.methods.vote("Crunchy",new anchor.BN(1)).rpc();
     const [crunchyAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer,'le',8),Buffer.from("Crunchy")],
      program.programId
    )
    const crunchyCandidate = await program.account.candidate.fetch(crunchyAddress)
    console.log(crunchyCandidate)
    const [pollAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer,'le',8)],
      program.programId
    )
    const poll = await program.account.poll.fetch(pollAddress);

    console.log(JSON.stringify(poll, null, 2));
  })

});
