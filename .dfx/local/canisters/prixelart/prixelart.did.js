export const idlFactory = ({ IDL }) => {
  const CeSo = IDL.Record({
    'tiktok' : IDL.Opt(IDL.Text),
    'twitter' : IDL.Opt(IDL.Text),
    'instagram' : IDL.Opt(IDL.Text),
    'facebook' : IDL.Opt(IDL.Text),
    'discord' : IDL.Opt(IDL.Text),
  });
  const DeSo = IDL.Record({
    'distrikt' : IDL.Opt(IDL.Text),
    'dscvr' : IDL.Opt(IDL.Text),
    'openChat' : IDL.Opt(IDL.Text),
  });
  const Socials = IDL.Record({
    'ceSo' : IDL.Opt(CeSo),
    'deSo' : IDL.Opt(DeSo),
  });
  const Bio = IDL.Record({
    'familyName' : IDL.Opt(IDL.Text),
    'about' : IDL.Opt(IDL.Text),
    'username' : IDL.Opt(IDL.Text),
    'displayName' : IDL.Opt(IDL.Text),
    'socials' : IDL.Opt(Socials),
    'givenName' : IDL.Opt(IDL.Text),
    'email' : IDL.Opt(IDL.Text),
    'phone' : IDL.Opt(IDL.Text),
    'location' : IDL.Opt(IDL.Text),
  });
  const ProfileUpdate = IDL.Record({ 'bio' : Bio });
  const Error = IDL.Variant({
    'NotFound' : IDL.Null,
    'NotAuthorized' : IDL.Null,
    'AlreadyExists' : IDL.Null,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : Error });
  const TokenIdentifier = IDL.Text;
  const CommonError = IDL.Variant({
    'InvalidToken' : TokenIdentifier,
    'Other' : IDL.Text,
  });
  const Result_2 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Text),
    'err' : CommonError,
  });
  const Profile = IDL.Record({ 'id' : IDL.Principal, 'bio' : Bio });
  const Result_1 = IDL.Variant({ 'ok' : Profile, 'err' : Error });
  return IDL.Service({
    'createProfile' : IDL.Func([ProfileUpdate], [Result], []),
    'deleteProfile' : IDL.Func([], [Result], []),
    'getDiscordHolders' : IDL.Func([IDL.Text], [Result_2], []),
    'readProfile' : IDL.Func([], [Result_1], []),
    'updateProfile' : IDL.Func([ProfileUpdate], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
