---
title: "Salesforce migration without the six-month freeze"
description: "Platform migrations stall because teams stop shipping while they replatform. How to sequence a Salesforce or commerce migration so delivery never pauses."
publishDate: 2026-07-23
author: "Cube27"
tags: ["Salesforce", "Migration", "Enterprise Commerce", "Delivery"]
---

The most expensive part of a platform migration is rarely the platform. It is the two quarters where the roadmap is frozen "until we're on the new system" — and the compounding cost of everything the business did not ship in the meantime.

That freeze is treated as unavoidable. It usually is not. It is a consequence of sequencing the migration as one atomic cutover instead of a series of reversible steps.

## Why the freeze happens

A big-bang migration forces a single moment where everything must be correct simultaneously: data, integrations, customizations, permissions, and user behavior. Because that moment is so risky, teams stop changing anything beforehand to avoid moving the target. The freeze is not caused by the migration work — it is caused by the _shape_ of the migration.

Change the shape and the freeze mostly disappears.

## Sequence by capability, not by object

The instinct is to migrate data model first, then features. This maximizes the window where neither system is fully usable.

Migrating capability-by-capability instead means each slice goes live independently and delivers value on its own. Order management moves. Then service. Then commerce. Each is a real cutover with a real rollback, and the business keeps shipping between them.

This requires accepting a period of dual-running, which teams resist because it feels inelegant. It is far cheaper than a frozen roadmap.

## Decide what not to bring

Every migration is an opportunity to stop carrying things. Most orgs are moving customizations that exist because of a constraint that no longer applies, or reports nobody has opened in two years.

Before migrating anything, classify it: **carry**, **rebuild**, or **retire**. Anything without a named owner who can explain why it exists is a retire candidate. Doing this classification honestly typically removes a meaningful share of the scope — and scope removed is the only work guaranteed to finish on time.

## Integrations are the real critical path

Data migrates once. Integrations have to keep working continuously, through every intermediate state.

Map every inbound and outbound integration before planning cutover order, and for each one decide whether it points at the old system, the new one, or both during dual-run. Integrations discovered mid-migration are the most common cause of an unplanned freeze — precisely because they surface only when something downstream breaks.

## Keep a delivery team on the roadmap

The structural fix is dedicated capacity. When the same engineers own both migration and roadmap, migration always wins the week and the roadmap silently stops.

Running a separate delivery pod — whether an embedded team or a dedicated Global Capability Center — means migration pressure never consumes product capacity. This is the practical argument for extended teams during replatforming: not cost, but protecting the roadmap from a temporary program.

We have seen this pattern hold across engagements where a dedicated center absorbed migration and platform work while the client's internal team stayed on product. Continuity matters here too — **under 10% annual attrition** means the person who mapped your integration edge cases in month one is still there at cutover.

## A working sequence

1. Inventory and classify: carry, rebuild, retire
2. Map every integration and assign its cutover state
3. Slice by capability, order by risk and dependency
4. Dual-run each slice with a defined rollback
5. Retire the old path only after a full business cycle on the new one

None of this is faster than a big-bang cutover on paper. It is faster in practice, because it does not require the entire organization to stand still while it happens.

---

_Cube27 delivers Salesforce and enterprise commerce migrations alongside dedicated delivery teams that keep your roadmap moving. [Talk to a Solutions Architect](/contact)._
