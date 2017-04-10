```swift
for each rule in rules
  if object id of rule exists in rule Table
    insert row under there
  else
    insert new object section

  insert new row titled rule.datum.block_description
  blocks_for_rule := rule.abilityID.blocks
  for each block in blocks_for_rule

    parse(block)
    insert new row with block


// for now for parsing blocks

function parse(block)
  block description
```
