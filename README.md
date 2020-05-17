# file-fantasy
Version control for HUMANS. Make sense of all the copies of copies of files on your desktop!

## Installation

```
npm install -g @davepagurek/file-fantasy
```

## Usage

`commit` a file to make a backup of it.

```
$ ff commit something.txt
something.txt was copied to something_Copy(2).txt
```

`branch` a file to make a separate version of it. No need to come up with a branch name, we do that for you!

```
$ ff branch something.txt
file: something.txt | newish file: spmfthiog.txt
something.txt was copied to spmfthiog.txt
```

`merge` a source branch into a destination branch (and shove the contents of both together.)

```
$ ff merge spmfthiog.txt something_Copy\(2\).txt
🤯 Merged to create: something_Copy(3)-spmfthiog.txt
```

Create a `log` of all the complex version history so you can understand where all those files came from.

<table>
  <tr>
    <td>
      <img alt="Screen Shot 2020-05-17 at 12 36 52 PM" src="https://user-images.githubusercontent.com/5315059/82158189-2c2f2100-983b-11ea-9f48-3d25ec2d72fd.png">
    </td>
    <td>
      <img alt="Screen Shot 2020-05-17 at 12 31 21 PM" src="https://user-images.githubusercontent.com/5315059/82158190-2d604e00-983b-11ea-927b-60a12631bf51.png">
    </td>
  </tr>
  <tr>
    <th><em>Broke</em></th>
    <th><em>Woke</em></th>
  </tr>
</table>

## Dev setup

```
# set up dependencies
npm install

# let you use the ff utility
npm link
```
